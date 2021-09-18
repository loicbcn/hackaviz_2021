-- Démographie - densité
select 
c.code_qp, c.nom_qp, c.commune_qp, c.code_commune, q.pop_mun, 
q.pop_mun / (st_area(c.geom, false) / 10000) densite, disp_d9, disp_d1, cast(disp_d9 as float8)/disp_d1 niv_vie
from data.contours_qp c
inner join data.qp q on q.code_qp = c.code_qp
order by q.pop_mun / (st_area(c.geom, false) / 10000) desc


-- Aggrégation par dept - communes
with depts as (
select distinct on (code_departement) code_departement, nom_departement from data.foncier_qp order by code_departement
)

select c.code_departement, max(d.nom_departement)  nom_departement, c.code_commune, max(c.nom_commune) nom_commune, count(*) nb,
sum(q.pop_mun) pop_mun
from data.contours_qp c
inner join data.qp q on q.code_qp = c.code_qp
inner join depts d on d.code_departement = c.code_departement
group by c.code_departement, code_commune
order by c.code_departement, code_commune


-- Arbre json
-- aggregation des qp dans les communes
with qpjson as (
select cod_com, max(com) com, sum(pop_mun) pop_mun, json_agg(t) dataqp from
(select cqp.code_qp, cqp.nom_qp, cqp.code_commune cod_com, cqp.commune_qp com, 
qp.pop_mun, ROUND(cast (qp.pop_mun / (st_area(cqp.geom, false) / 10000) as numeric),2) densite
from data.contours_qp cqp
inner join data.qp on qp.code_qp = cqp.code_qp
order by cqp.code_departement, cqp.code_commune) t
group by cod_com
), depts as(
	select distinct on (code_departement) code_departement, nom_departement from data.foncier_qp order by code_departement
) 

-- aggregation des qp par département
select json_agg(b) from (
select substr(t.cod_com, 1, 2) cod_dep, max(d.nom_departement) nom_dep, json_agg(t) data_com from qpjson t 
inner join depts d on d.code_departement = substr(t.cod_com, 1, 2)
group by substr(cod_com, 1, 2)
) b



// avec extent
-- Arbre json
-- aggregation des qp dans les communes

with 
communeextents as (
	select code_commune, 
	(ARRAY[st_xmin(st_envelope(st_transform(geom,3857))), st_ymin(st_envelope(st_transform(geom,3857))), st_xmax(st_envelope(st_transform(geom,3857))), st_ymax(st_envelope(st_transform(geom,3857)))]) extent
	from data.communes
),
qpjson as (
select cod_com, max(com) com, sum(pop_mun) pop_mun, sum(area) area,
round(sum((cast(brev as numeric)*pop_mun))/sum(pop_mun),1) brev,
round(sum(tx_abcde*pop_mun)/sum(pop_mun),1) tx_abcde,
round(sum(cast(tx_f as numeric)*pop_mun)/sum(pop_mun),1) tx_f,
round(sum(cast(tx_tot_et as numeric)*pop_mun)/sum(pop_mun),1) tx_tot_et,
round(cast(sum(pop_mun)/sum(area) as numeric),2) densite,
round(sum(cast(ind_jeune as numeric)*pop_mun)/sum(pop_mun),1) ind_jeune,
json_agg(ce.extent)->0 extent,
json_agg(t) dataqp from
	(select cqp.code_qp, cqp.nom_qp, cqp.code_commune cod_com, cqp.commune_qp com, round(cast (st_area(cqp.geom, false) as numeric) / 10000,4) area,
	qp.pop_mun, ROUND(cast (qp.pop_mun / (st_area(cqp.geom, false) / 10000) as numeric),2) densite,
	array_to_json(ARRAY[
		st_xmin(st_envelope(st_transform(geom,3857))), 
		st_ymin(st_envelope(st_transform(geom,3857))), 
		st_xmax(st_envelope(st_transform(geom,3857))), 
		st_ymax(st_envelope(st_transform(geom,3857)))]
		) extent,
		ind_jeune, 
		round(cast(serv_par as numeric)/pop_mun, 5) serv_par, 
		tx_tot_et, 
		tx_f, brev, 
		round(cast(abcde as numeric)*100/pop_mun, 1) tx_abcde
	from data.contours_qp cqp
	inner join data.qp on qp.code_qp = cqp.code_qp
	order by cqp.code_departement, cqp.code_commune) t
inner join communeextents ce on ce.code_commune = cod_com
group by cod_com
), dept_noms as (
	select distinct on(code_departement) code_departement, nom_departement 
	from data.foncier_qp
),
depts as (
select c.code_departement, max(d.nom_departement) nom_departement,
ARRAY[
	st_xmin(st_envelope(st_transform(st_union(c.geom),3857))), 
	st_ymin(st_envelope(st_transform(st_union(c.geom),3857))), 
	st_xmax(st_envelope(st_transform(st_union(c.geom),3857))), 
	st_ymax(st_envelope(st_transform(st_union(c.geom),3857)))] extent
from data.communes c
inner join dept_noms d on d.code_departement = c.code_departement
group by c.code_departement)

-- aggregation des qp par département
select json_agg(b) from (
select substr(t.cod_com, 1, 2) cod_dep, max(d.nom_departement) nom_dep, sum(area) area,
round(sum((cast(brev as numeric)*pop_mun))/sum(pop_mun),1) brev,
round(sum(tx_abcde*pop_mun)/sum(pop_mun),1) tx_abcde,
round(sum(cast(tx_f as numeric)*pop_mun)/sum(pop_mun),1) tx_f,
round(sum(cast(tx_tot_et as numeric)*pop_mun)/sum(pop_mun),1) tx_tot_et,
round(cast(sum(pop_mun)/sum(area) as numeric),2) densite,
round(sum(cast(ind_jeune as numeric)*pop_mun)/sum(pop_mun),1) ind_jeune,
	json_agg(d.extent)->0 extent, json_agg(t) data_com
from qpjson t 
inner join depts d on d.code_departement = substr(t.cod_com, 1, 2)
group by substr(cod_com, 1, 2)) b


--Aggrégation pour la région
-- aggregation des qp région
select json_agg(c) from (
select cod_reg, round(avg(brev),1) brev,
	round(avg(tx_abcde),1) tx_abcde,
	round(avg(cast(tx_f as numeric)),1) tx_f,
	round(avg(tx_tot_et),0) tx_tot_et,	
	round(avg(densite),2) densite, 
	round(avg(cast(ind_jeune as numeric)),1) ind_jeune,
	json_agg(extent)->0 extent
from(
select '76' as cod_reg, substr(t.cod_com, 1, 2) cod_dep, max(d.nom_departement) nom_dep, sum(pop_mun) pop_mun, sum(area) area,
    round(sum((cast(brev as numeric)*pop_mun))/sum(pop_mun),1) brev,
    round(sum(tx_abcde*pop_mun)/sum(pop_mun),1) tx_abcde,
    round(sum(cast(tx_f as numeric)*pop_mun)/sum(pop_mun),1) tx_f,
    round(sum(cast(tx_tot_et as numeric)*pop_mun)/sum(pop_mun),1) tx_tot_et,
    round(cast(sum(pop_mun)/sum(area) as numeric),2) densite,
    round(sum(cast(ind_jeune as numeric)*pop_mun)/sum(pop_mun),1) ind_jeune,
	json_agg(d.extent)->0 extent, json_agg(t) data_com
from qpjson t 
inner join depts d on d.code_departement = substr(t.cod_com, 1, 2)
group by substr(cod_com, 1, 2))c
group by cod_reg) c


-- supprimer les indicateurs null
-- 	where(pop_mun is not null and ind_jeune is not null and tx_tot_et is not null and tx_f is not null and  brev is not null and abcde is not null) and (pop_mun <> 0 and ind_jeune <> 0 and tx_tot_et <> 0 and tx_f <> 0 and  brev <> 0 and abcde <> 0) 
