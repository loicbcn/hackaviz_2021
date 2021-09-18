$(function(){
    /* -- Carte  -- */
    var view =  new ol.View({
      center: [239043.47, 5420984.97],
      zoom: 6
    });

    var planignv2 = new ol.layer.Image({
          name: 'planignv2',
          source: new ol.source.ImageWMS({
            url: 'https://wxs.ign.fr/essentiels/geoportail/r/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities',
            params: {LAYERS: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2', TILED: true}
          }),
          visible:true
    });

    var bdortho = new ol.layer.Image({
          name: 'bdortho',
          source: new ol.source.ImageWMS({
          url: 'https://wxs.ign.fr/essentiels/geoportail/r/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities',
          params: {LAYERS: 'ORTHOIMAGERY.ORTHOPHOTOS', TILED: true}
        }),
        visible:false
    });

    var communesqpvstyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(0,0,0,1)',
            width: 2
        })
    });

    var qpvstyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(255,0,0,1)',
            width: 2
        })
    });


    var qpv_lab_style = new ol.style.Style({
      text: new ol.style.Text({
        font: 'bold 18px Calibri,sans-serif',
        overflow: true,
        fill: new ol.style.Fill({
          color: 'rgb(255,0,0)'
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: 2
        })
      })
    });

    var communesqpv = new ol.layer.Vector({
      name: 'communesqpv',
      source: new ol.source.Vector({
        url: 'layers/communes.json',
        format: new ol.format.GeoJSON(),
      }),
      style: communesqpvstyle
    });

    var qpv = new ol.layer.Vector({
      name: 'qpv',
      source: new ol.source.Vector({
        url: 'layers/qp.json',
        format: new ol.format.GeoJSON(),
      }),
      style: function(feature) { 
        if( view.getZoom() > 12) {
            qpv_lab_style.getText().setText(feature.get('nom_qp'));
            return [qpvstyle, qpv_lab_style];
        } else {
            return [qpvstyle];    
        }
        
      }
    });

    /* -- Menu de sélection  -- */
    var menu_sel_data = [{"cod_dep":"09","nom_dep":"Ariège","area":81.2441,"brev":56.4,"tx_abcde":20.9,"tx_f":53.6,"tx_tot_et":10.6,"densite":82.52,"ind_jeune":0.9,"extent":[124933.86451729095,5301490.437585138,187517.68224126933,5337898.744833214],"data_com":[{"cod_com":"09122","com":"Foix","pop_mun":1236,"area":13.8608,"brev":51.5,"tx_abcde":25.5,"tx_f":54.6,"tx_tot_et":9.0,"densite":89.17,"ind_jeune":0.7,"extent":[174894.0519853121,5301490.437585138,183287.54159112496,5313341.839061632],"dataqp":[{"code_qp":"QP009002","nom_qp":"Centre Ancien","cod_com":"09122","com":"Foix","area":13.8608,"pop_mun":1236,"densite":89.17,"extent":[178478.53958885552,5306433.035920241,179346.83161704306,5307193.667368339],"ind_jeune":0.7,"serv_par":0.06715,"tx_tot_et":9,"tx_f":54.6,"brev":51.5,"tx_abcde":25.5}]},{"cod_com":"09225","com":"Pamiers","pop_mun":4291,"area":51.1718,"brev":58.1,"tx_abcde":19.4,"tx_f":53.4,"tx_tot_et":11.0,"densite":83.85,"ind_jeune":1.0,"extent":[172422.75928970144,5324994.88681948,187517.68224126933,5337898.744833214],"dataqp":[{"code_qp":"QP009003","nom_qp":"Centre Ancien - La Gloriette","cod_com":"09225","com":"Pamiers","area":51.1718,"pop_mun":4291,"densite":83.85,"extent":[178701.17857044205,5328272.545218193,179792.10958021614,5330529.462825829],"ind_jeune":1,"serv_par":0.02494,"tx_tot_et":11,"tx_f":53.4,"brev":58.1,"tx_abcde":19.4}]},{"cod_com":"09261","com":"Saint-Girons","pop_mun":1177,"area":16.2115,"brev":55.6,"tx_abcde":21.7,"tx_f":53.5,"tx_tot_et":11.0,"densite":72.60,"ind_jeune":0.7,"extent":[124933.86451729095,5302281.077987606,133572.25700284896,5311439.126429459],"dataqp":[{"code_qp":"QP009001","nom_qp":"Coeur De Ville","cod_com":"09261","com":"Saint-Girons","area":16.2115,"pop_mun":1177,"densite":72.60,"extent":[126937.61535156987,5309171.598549826,127850.43517607471,5309947.670383325],"ind_jeune":0.7,"serv_par":0.08326,"tx_tot_et":11,"tx_f":53.5,"brev":55.6,"tx_abcde":21.7}]}]},{"cod_dep":"11","nom_dep":"Aude","area":296.5161,"brev":64.8,"tx_abcde":17.9,"tx_f":53.1,"tx_tot_et":13.6,"densite":85.18,"ind_jeune":1.3,"extent":[242721.01772565368,5313707.204193767,354118.4321624825,5349231.033221752],"data_com":[{"cod_com":"11069","com":"Carcassonne","pop_mun":9831,"area":132.5839,"brev":68.0,"tx_abcde":18.2,"tx_f":53.6,"tx_tot_et":18.4,"densite":74.15,"ind_jeune":1.5,"extent":[251771.2923271468,5338066.643115489,271218.8073687317,5349231.033221752],"dataqp":[{"code_qp":"QP011006","nom_qp":"Grazailles","cod_com":"11069","com":"Carcassonne","area":10.5769,"pop_mun":1084,"densite":102.49,"extent":[262068.34522552465,5346220.98143851,262658.33852672897,5346816.802773455],"ind_jeune":2.1,"serv_par":0.00000,"tx_tot_et":null,"tx_f":56.1,"brev":69.7,"tx_abcde":19.6},{"code_qp":"QP011004","nom_qp":"Bastide Pont-Vieux","cod_com":"11069","com":"Carcassonne","area":42.8919,"pop_mun":3775,"densite":88.01,"extent":[261211.1851464164,5344021.355872976,262480.2273414597,5344968.353202193],"ind_jeune":1.1,"serv_par":0.05536,"tx_tot_et":10,"tx_f":52.3,"brev":55.6,"tx_abcde":20.6},{"code_qp":"QP011002","nom_qp":"La Conte - Ozanam","cod_com":"11069","com":"Carcassonne","area":50.7106,"pop_mun":2060,"densite":40.62,"extent":[263125.88038806076,5343288.262761723,264873.5963935151,5345380.785360163],"ind_jeune":2,"serv_par":0.00340,"tx_tot_et":24,"tx_f":53.5,"brev":78.4,"tx_abcde":22.7},{"code_qp":"QP011003","nom_qp":"Le Viguier - Saint-Jacques","cod_com":"11069","com":"Carcassonne","area":16.2892,"pop_mun":1862,"densite":114.31,"extent":[258806.6841452817,5343471.5306313345,260008.9346458491,5344204.638165206],"ind_jeune":1.6,"serv_par":0.00215,"tx_tot_et":38,"tx_f":52.4,"brev":80.4,"tx_abcde":17.7},{"code_qp":"QP011005","nom_qp":"Fleming La Reille","cod_com":"11069","com":"Carcassonne","area":12.1153,"pop_mun":1050,"densite":86.67,"extent":[260164.78193295965,5346037.659465737,261110.9976047025,5346618.191426176],"ind_jeune":1.2,"serv_par":0.00667,"tx_tot_et":22,"tx_f":57.8,"brev":68,"tx_abcde":0.0}]},{"cod_com":"11203","com":"Lézignan-Corbières","pop_mun":2993,"area":50.1977,"brev":58.1,"tx_abcde":10.4,"tx_f":52.5,"tx_tot_et":7.0,"densite":59.62,"ind_jeune":0.9,"extent":[303078.4456337666,5335640.0437267395,312496.0745548776,5348757.305731002],"dataqp":[{"code_qp":"QP011010","nom_qp":"Centre Ville","cod_com":"11203","com":"Lézignan-Corbières","area":50.1977,"pop_mun":2993,"densite":59.62,"extent":[306696.32908454805,5342066.569083916,308477.44093724043,5343272.990601991],"ind_jeune":0.9,"serv_par":0.03107,"tx_tot_et":7,"tx_f":52.5,"brev":58.1,"tx_abcde":10.4}]},{"cod_com":"11206","com":"Limoux","pop_mun":2050,"area":27.0729,"brev":58.2,"tx_abcde":16.0,"tx_f":51.0,"tx_tot_et":13.0,"densite":75.72,"ind_jeune":0.8,"extent":[242721.01772565368,5313707.204193767,257136.89178338263,5324400.458107434],"dataqp":[{"code_qp":"QP011001","nom_qp":"Quartier Aude","cod_com":"11206","com":"Limoux","area":27.0729,"pop_mun":2050,"densite":75.72,"extent":[246283.24143103845,5319798.72638497,247452.09608436783,5321306.991329936],"ind_jeune":0.8,"serv_par":0.05366,"tx_tot_et":13,"tx_f":51,"brev":58.2,"tx_abcde":16.0}]},{"cod_com":"11262","com":"Narbonne","pop_mun":10384,"area":86.6616,"brev":65.0,"tx_abcde":20.1,"tx_f":53.3,"tx_tot_et":11.1,"densite":119.82,"ind_jeune":1.4,"extent":[320867.30026253173,5321383.172787353,354118.4321624825,5348222.481081352],"dataqp":[{"code_qp":"QP011008","nom_qp":"Narbonne Centre","cod_com":"11262","com":"Narbonne","area":37.3745,"pop_mun":4661,"densite":124.71,"extent":[333457.53467125096,5339471.001720545,335016.00754235685,5340585.480321499],"ind_jeune":1.2,"serv_par":0.03197,"tx_tot_et":10,"tx_f":54.6,"brev":57.7,"tx_abcde":24.6},{"code_qp":"QP011009","nom_qp":"Narbonne Est","cod_com":"11262","com":"Narbonne","area":10.8711,"pop_mun":1692,"densite":155.64,"extent":[335249.7784730227,5341242.016396324,335873.16762146505,5341883.328847718],"ind_jeune":1.6,"serv_par":0.00296,"tx_tot_et":null,"tx_f":52.1,"brev":72.8,"tx_abcde":19.2},{"code_qp":"QP011007","nom_qp":"Narbonne Ouest","cod_com":"11262","com":"Narbonne","area":38.4160,"pop_mun":4031,"densite":104.93,"extent":[330986.2419756403,5339623.662144889,333535.4583148063,5340936.6450265655],"ind_jeune":1.5,"serv_par":0.00521,"tx_tot_et":17,"tx_f":52.2,"brev":70.1,"tx_abcde":15.2}]}]},{"cod_dep":"12","nom_dep":"Aveyron","area":38.3781,"brev":64.7,"tx_abcde":16.7,"tx_f":50.0,"tx_tot_et":23.7,"densite":94.61,"ind_jeune":1.8,"extent":[219922.7860111913,5512748.039001274,295174.7617874442,5528971.164904761],"data_com":[{"cod_com":"12176","com":"Onet-le-Château","pop_mun":1540,"area":18.1138,"brev":61.5,"tx_abcde":15.4,"tx_f":50.3,"tx_tot_et":30.0,"densite":85.02,"ind_jeune":2.2,"extent":[275092.7256483376,5520669.16718743,295174.7617874442,5528971.164904761],"dataqp":[{"code_qp":"QP012001","nom_qp":"Quatre Saisons","cod_com":"12176","com":"Onet-le-Château","area":18.1138,"pop_mun":1540,"densite":85.02,"extent":[288384.2728490545,5521821.338070607,289631.05114593916,5522475.337638576],"ind_jeune":2.2,"serv_par":0.00325,"tx_tot_et":30,"tx_f":50.3,"brev":61.5,"tx_abcde":15.4}]},{"cod_com":"12300","com":"Villefranche-de-Rouergue","pop_mun":2091,"area":20.2643,"brev":67.1,"tx_abcde":17.6,"tx_f":49.8,"tx_tot_et":19.0,"densite":103.19,"ind_jeune":1.5,"extent":[219922.7860111913,5512748.039001274,231856.23542423022,5525901.816066106],"dataqp":[{"code_qp":"QP012002","nom_qp":"La Bastide","cod_com":"12300","com":"Villefranche-de-Rouergue","area":20.2643,"pop_mun":2091,"densite":103.19,"extent":[226167.8094446939,5519688.379607958,227147.42096367475,5520871.565049795],"ind_jeune":1.5,"serv_par":0.03156,"tx_tot_et":19,"tx_f":49.8,"brev":67.1,"tx_abcde":17.6}]}]},{"cod_dep":"30","nom_dep":"Gard","area":768.9161,"brev":70.1,"tx_abcde":19.3,"tx_f":52.6,"tx_tot_et":18.2,"densite":100.40,"ind_jeune":1.6,"extent":[438643.32152181515,5393808.167680899,520797.10572725104,5509653.041270505],"data_com":[{"cod_com":"30007","com":"Alès","pop_mun":14621,"area":235.0011,"brev":62.5,"tx_abcde":19.9,"tx_f":56.6,"tx_tot_et":11.0,"densite":62.22,"ind_jeune":0.7,"extent":[451244.68787961383,5480000.441849265,459448.93435107794,5489646.3978550425],"dataqp":[{"code_qp":"QP030001","nom_qp":"Près Saint Jean - Cévennes - Tamaris - Cauvel-la Royale - Rochebelle - Centre ville","cod_com":"30007","com":"Alès","area":235.0011,"pop_mun":14621,"densite":62.22,"extent":[452780.896852561,5483581.597021662,455497.09242791677,5489274.018146687],"ind_jeune":0.7,"serv_par":0.01983,"tx_tot_et":11,"tx_f":56.6,"brev":62.5,"tx_abcde":19.9}]},{"cod_com":"30010","com":"Anduze","pop_mun":1134,"area":13.1471,"brev":59.5,"tx_abcde":20.6,"tx_f":55.2,"tx_tot_et":7.0,"densite":86.25,"ind_jeune":0.8,"extent":[438643.32152181515,5470473.011435518,446680.5887570896,5477133.425784361],"dataqp":[{"code_qp":"QP030002","nom_qp":"Centre Ville","cod_com":"30010","com":"Anduze","area":13.1471,"pop_mun":1134,"densite":86.25,"extent":[443318.7401351327,5473725.167739848,443864.2056400197,5474639.0762958815],"ind_jeune":0.8,"serv_par":0.01940,"tx_tot_et":7,"tx_f":55.2,"brev":59.5,"tx_abcde":20.6}]},{"cod_com":"30028","com":"Bagnols-sur-Cèze","pop_mun":4006,"area":31.9453,"brev":74.0,"tx_abcde":14.3,"tx_f":52.6,"tx_tot_et":23.0,"densite":125.40,"ind_jeune":1.4,"extent":[509943.4553749069,5485132.314842709,519572.59132852504,5496010.225536389],"dataqp":[{"code_qp":"QP030010","nom_qp":"Escanaux - Coronelle - Citadelle - Vigan Braquet","cod_com":"30028","com":"Bagnols-sur-Cèze","area":31.9453,"pop_mun":4006,"densite":125.40,"extent":[513349.8317931811,5489491.237802713,514952.83246060414,5490670.520153793],"ind_jeune":1.4,"serv_par":0.00574,"tx_tot_et":23,"tx_f":52.6,"brev":74,"tx_abcde":14.3}]},{"cod_com":"30032","com":"Beaucaire","pop_mun":6315,"area":54.9534,"brev":63.3,"tx_abcde":31.3,"tx_f":51.5,"tx_tot_et":21.8,"densite":114.92,"ind_jeune":1.5,"extent":[503943.3348211495,5422875.6313949395,518192.22964268853,5440437.306770661],"dataqp":[{"code_qp":"QP030013","nom_qp":"Centre Ville","cod_com":"30032","com":"Beaucaire","area":38.9843,"pop_mun":4374,"densite":112.20,"extent":[516322.0621973615,5435330.332089322,517457.5210034528,5436610.667051923],"ind_jeune":1.5,"serv_par":0.02355,"tx_tot_et":24,"tx_f":51.1,"brev":61.7,"tx_abcde":38.2},{"code_qp":"QP030012","nom_qp":"La Moulinelle","cod_com":"30032","com":"Beaucaire","area":15.9691,"pop_mun":1941,"densite":121.55,"extent":[514897.17271520756,5435746.807070851,515620.74940536387,5436456.400400313],"ind_jeune":1.5,"serv_par":0.00052,"tx_tot_et":17,"tx_f":52.4,"brev":66.9,"tx_abcde":15.7}]},{"cod_com":"30132","com":"La Grand-Combe","pop_mun":3433,"area":80.9769,"brev":61.0,"tx_abcde":14.9,"tx_f":52.7,"tx_tot_et":14.1,"densite":42.39,"ind_jeune":0.8,"extent":[445867.95647429867,5496460.517557866,451422.79906488303,5504554.025805106],"dataqp":[{"code_qp":"QP030016","nom_qp":"Centre Ville - Arboux","cod_com":"30132","com":"La Grand-Combe","area":45.6075,"pop_mun":2421,"densite":53.08,"extent":[447871.7073085775,5497625.168680404,449096.2217073036,5498991.881757224],"ind_jeune":0.8,"serv_par":0.03098,"tx_tot_et":12,"tx_f":54,"brev":60.6,"tx_abcde":16.8},{"code_qp":"QP030017","nom_qp":"Trescol - La Levade","cod_com":"30132","com":"La Grand-Combe","area":35.3694,"pop_mun":1012,"densite":28.61,"extent":[446446.81782642374,5498991.881757224,447526.61688711843,5501026.798933712],"ind_jeune":0.9,"serv_par":0.00000,"tx_tot_et":19,"tx_f":49.7,"brev":61.9,"tx_abcde":10.2}]},{"cod_com":"30189","com":"Nîmes","pop_mun":37833,"area":239.0125,"brev":76.0,"tx_abcde":17.5,"tx_f":51.4,"tx_tot_et":20.5,"densite":158.29,"ind_jeune":2.1,"extent":[471582.75884754484,5425510.062521454,495360.6020809881,5453163.060924875],"dataqp":[{"code_qp":"QP030004","nom_qp":"Gambetta-Richelieu","cod_com":"30189","com":"Nîmes","area":36.4053,"pop_mun":6862,"densite":188.49,"extent":[485096.9450298483,5440499.039796714,486755.605442668,5441440.519727897],"ind_jeune":1.2,"serv_par":0.01763,"tx_tot_et":11,"tx_f":51.6,"brev":59.8,"tx_abcde":19.0},{"code_qp":"QP030007","nom_qp":"Route De Beaucaire","cod_com":"30189","com":"Nîmes","area":7.8038,"pop_mun":1722,"densite":220.66,"extent":[486833.52908622334,5440113.215173304,487456.9182346656,5440622.50709038],"ind_jeune":1.3,"serv_par":0.00871,"tx_tot_et":null,"tx_f":56,"brev":55.4,"tx_abcde":17.3},{"code_qp":"QP030003","nom_qp":"Pissevin - Valdegour","cod_com":"30189","com":"Nîmes","area":96.3028,"pop_mun":15597,"densite":161.96,"extent":[481267.55454655964,5437459.179814189,483349.22902439383,5439758.270795864],"ind_jeune":2.8,"serv_par":0.00866,"tx_tot_et":26,"tx_f":51.2,"brev":85.7,"tx_abcde":16.5},{"code_qp":"QP030008","nom_qp":"Némausus-Jonquilles - Haute Magaille - Oliviers","cod_com":"30189","com":"Nîmes","area":27.9804,"pop_mun":3374,"densite":120.58,"extent":[486566.3623083194,5438400.349025893,488169.36297574255,5439789.134981273],"ind_jeune":2.7,"serv_par":0.00356,"tx_tot_et":21,"tx_f":47.5,"brev":67.9,"tx_abcde":16.9},{"code_qp":"QP030006","nom_qp":"Mas De Mingue","cod_com":"30189","com":"Nîmes","area":27.0329,"pop_mun":3014,"densite":111.49,"extent":[489048.7869530095,5442690.830409697,490106.32211554557,5443925.871854626],"ind_jeune":2.4,"serv_par":0.00232,"tx_tot_et":17,"tx_f":51.7,"brev":77.8,"tx_abcde":18.6},{"code_qp":"QP030005","nom_qp":"Chemin-Bas D'Avignon - Clos D'Orville","cod_com":"30189","com":"Nîmes","area":43.4873,"pop_mun":7264,"densite":167.04,"extent":[487757.48085980746,5440236.677294053,489360.4815272306,5441826.399971432],"ind_jeune":1.4,"serv_par":0.00675,"tx_tot_et":24,"tx_f":52.2,"brev":78.4,"tx_abcde":17.9}]},{"cod_com":"30202","com":"Pont-Saint-Esprit","pop_mun":1353,"area":11.5438,"brev":55.8,"tx_abcde":19.5,"tx_f":48.9,"tx_tot_et":15.0,"densite":117.21,"ind_jeune":1.4,"extent":[512737.574593818,5499318.059380877,520797.10572725104,5509653.041270505],"dataqp":[{"code_qp":"QP030011","nom_qp":"Centre Ville","cod_com":"30202","com":"Pont-Saint-Esprit","area":11.5438,"pop_mun":1353,"densite":117.21,"extent":[517401.8612580562,5504864.859941229,517913.9309157053,5505502.1029705815],"ind_jeune":1.4,"serv_par":0.03104,"tx_tot_et":15,"tx_f":48.9,"brev":55.8,"tx_abcde":19.5}]},{"cod_com":"30227","com":"Saint-Ambroix","pop_mun":1234,"area":16.3410,"brev":57.1,"tx_abcde":19.4,"tx_f":57.2,"tx_tot_et":2.0,"densite":75.52,"ind_jeune":0.4,"extent":[463267.1928852873,5500218.991352825,469857.3067402491,5507725.030148496],"dataqp":[{"code_qp":"QP030014","nom_qp":"L'Ecusson","cod_com":"30227","com":"Saint-Ambroix","area":16.3410,"pop_mun":1234,"densite":75.52,"extent":[466873.94438698934,5505486.5599290235,467875.81980412884,5506170.478766349],"ind_jeune":0.4,"serv_par":0.04538,"tx_tot_et":2,"tx_f":57.2,"brev":57.1,"tx_abcde":19.4}]},{"cod_com":"30258","com":"Saint-Gilles","pop_mun":3272,"area":25.8738,"brev":70.1,"tx_abcde":24.9,"tx_f":48.3,"tx_tot_et":29.0,"densite":126.46,"ind_jeune":1.2,"extent":[483082.06224649004,5395589.573395885,499379.2356986252,5430565.34706971],"dataqp":[{"code_qp":"QP030009","nom_qp":"Sabatot - Centre Ancien","cod_com":"30258","com":"Saint-Gilles","area":25.8738,"pop_mun":3272,"densite":126.46,"extent":[493100.81641788455,5415146.145466867,494035.9001405481,5416746.941886665],"ind_jeune":1.2,"serv_par":0.01498,"tx_tot_et":29,"tx_f":48.3,"brev":70.1,"tx_abcde":24.9}]},{"cod_com":"30334","com":"Uzès","pop_mun":1261,"area":33.6700,"brev":58.6,"tx_abcde":15.5,"tx_f":54.1,"tx_tot_et":16.0,"densite":37.45,"ind_jeune":1.8,"extent":[488158.2310266633,5462579.711912749,495015.5116595288,5477319.367204841],"dataqp":[{"code_qp":"QP030018","nom_qp":"Quartier Prioritaire D'Uzès","cod_com":"30334","com":"Uzès","area":33.6700,"pop_mun":1261,"densite":37.45,"extent":[490996.8780418918,5468197.187645713,491831.7742228412,5469962.063088559],"ind_jeune":1.8,"serv_par":0.00714,"tx_tot_et":16,"tx_f":54.1,"brev":58.6,"tx_abcde":15.5}]},{"cod_com":"30341","com":"Vauvert","pop_mun":2734,"area":26.4512,"brev":72.2,"tx_abcde":19.9,"tx_f":54.0,"tx_tot_et":16.0,"densite":103.36,"ind_jeune":1.8,"extent":[472595.7662137636,5393808.167680899,487367.86264203105,5421705.014502454],"dataqp":[{"code_qp":"QP030015","nom_qp":"Les Costières","cod_com":"30341","com":"Vauvert","area":26.4512,"pop_mun":2734,"densite":103.36,"extent":[475356.4895854368,5418178.658360718,476703.45542403543,5419287.236510159],"ind_jeune":1.8,"serv_par":0.00914,"tx_tot_et":16,"tx_f":54,"brev":72.2,"tx_abcde":19.9}]}]},{"cod_dep":"31","nom_dep":"Haute-Garonne","area":626.8225,"brev":63.6,"tx_abcde":19.5,"tx_f":50.4,"tx_tot_et":21.0,"densite":109.50,"ind_jeune":1.5,"extent":[76832.71254551742,5324187.082671257,168682.42439904745,5414315.072129558],"data_com":[{"cod_com":"31069","com":"Blagnac","pop_mun":1613,"area":9.5328,"brev":63.9,"tx_abcde":17.0,"tx_f":53.5,"tx_tot_et":17.0,"densite":169.21,"ind_jeune":1.9,"extent":[149980.7499457775,5406100.702257638,156581.99574981863,5413991.897135284],"dataqp":[{"code_qp":"QP031004","nom_qp":"Barradels","cod_com":"31069","com":"Blagnac","area":9.5328,"pop_mun":1613,"densite":169.20,"extent":[153565.23754932088,5409514.778348042,154500.32127198437,5409945.472104566],"ind_jeune":1.9,"serv_par":0.00248,"tx_tot_et":17,"tx_f":53.5,"brev":63.9,"tx_abcde":17.0}]},{"cod_com":"31149","com":"Colomiers","pop_mun":4179,"area":37.4789,"brev":54.1,"tx_abcde":13.4,"tx_f":52.1,"tx_tot_et":19.4,"densite":111.50,"ind_jeune":1.7,"extent":[142923.09422948395,5402334.378274998,152106.952219929,5408899.536366277],"dataqp":[{"code_qp":"QP031005","nom_qp":"Val D'Aran - Poitou - Pyrénées","cod_com":"31149","com":"Colomiers","area":25.4813,"pop_mun":3011,"densite":118.16,"extent":[147509.4572501668,5405178.195365856,148544.72851454426,5406485.107294879],"ind_jeune":1.5,"serv_par":0.02059,"tx_tot_et":18,"tx_f":52.4,"brev":51.3,"tx_abcde":12.8},{"code_qp":"QP031016","nom_qp":"En Jacca","cod_com":"31149","com":"Colomiers","area":11.9976,"pop_mun":1168,"densite":97.35,"extent":[146207.01920788552,5404409.509917525,147353.60996305622,5404778.470958637],"ind_jeune":2.3,"serv_par":0.00086,"tx_tot_et":23,"tx_f":51.3,"brev":61.4,"tx_abcde":15.0}]},{"cod_com":"31157","com":"Cugnaux","pop_mun":1059,"area":8.0289,"brev":59.0,"tx_abcde":18.3,"tx_f":57.1,"tx_tot_et":20.0,"densite":131.90,"ind_jeune":1.8,"extent":[145939.85242998163,5392595.165109988,153086.5637389098,5397647.8309255745],"dataqp":[{"code_qp":"QP031017","nom_qp":"Vivier Maçon","cod_com":"31157","com":"Cugnaux","area":8.0289,"pop_mun":1059,"densite":131.90,"extent":[148644.9160562582,5393961.723640254,149234.90935746254,5394391.693874409],"ind_jeune":1.8,"serv_par":0.00378,"tx_tot_et":20,"tx_f":57.1,"brev":59,"tx_abcde":18.3}]},{"cod_com":"31395","com":"Muret","pop_mun":4886,"area":39.5313,"brev":57.5,"tx_abcde":19.2,"tx_f":52.5,"tx_tot_et":16.2,"densite":123.60,"ind_jeune":2.0,"extent":[136121.47334201494,5371400.93668286,153030.90399351317,5387192.324065733],"dataqp":[{"code_qp":"QP031001","nom_qp":"Saint Jean","cod_com":"31395","com":"Muret","area":19.6418,"pop_mun":2938,"densite":149.58,"extent":[147676.43648635672,5382942.870237183,148867.55503784472,5384016.555511325],"ind_jeune":2.4,"serv_par":0.01021,"tx_tot_et":17,"tx_f":54.1,"brev":59.4,"tx_abcde":19.9},{"code_qp":"QP031002","nom_qp":"Centre Ouest","cod_com":"31395","com":"Muret","area":19.8895,"pop_mun":1948,"densite":97.94,"extent":[146741.35276369323,5381623.941371922,148132.84639860914,5383004.220331988],"ind_jeune":1.3,"serv_par":0.05185,"tx_tot_et":15,"tx_f":50.2,"brev":54.6,"tx_abcde":18.1}]},{"cod_com":"31483","com":"Saint-Gaudens","pop_mun":1357,"area":33.7999,"brev":53.1,"tx_abcde":24.5,"tx_f":56.6,"tx_tot_et":null,"densite":40.15,"ind_jeune":0.8,"extent":[76832.71254551742,5324187.082671257,84647.34079920522,5336601.450962174],"dataqp":[{"code_qp":"QP031003","nom_qp":"Coeur De Ville","cod_com":"31483","com":"Saint-Gaudens","area":33.7999,"pop_mun":1357,"densite":40.15,"extent":[79960.7902368084,5328150.565218925,81274.36022816904,5329080.702982227],"ind_jeune":0.8,"serv_par":0.10464,"tx_tot_et":null,"tx_f":56.6,"brev":53.1,"tx_abcde":24.5}]},{"cod_com":"31555","com":"Toulouse","pop_mun":55543,"area":498.4507,"brev":65.2,"tx_abcde":20.0,"tx_f":49.7,"tx_tot_et":22.2,"densite":111.43,"ind_jeune":1.5,"extent":[150314.70841815733,5393393.579309519,168682.42439904745,5414315.072129558],"dataqp":[{"code_qp":"QP031010","nom_qp":"Empalot","cod_com":"31555","com":"Toulouse","area":47.3912,"pop_mun":5502,"densite":116.10,"extent":[159888.18462637882,5399783.372877321,160878.92809443898,5401289.303057231],"ind_jeune":1.5,"serv_par":0.00600,"tx_tot_et":24,"tx_f":49.5,"brev":63.7,"tx_abcde":22.8},{"code_qp":"QP031019","nom_qp":"La Gloire","cod_com":"31555","com":"Toulouse","area":6.1792,"pop_mun":1162,"densite":188.05,"extent":[163327.956891891,5404824.592123835,163962.47798941264,5405316.56553261],"ind_jeune":1.7000000000000002,"serv_par":0.00086,"tx_tot_et":21,"tx_f":53.5,"brev":58.2,"tx_abcde":17.6},{"code_qp":"QP031012","nom_qp":"Cépière Beauregard","cod_com":"31555","com":"Toulouse","area":25.7625,"pop_mun":1549,"densite":60.13,"extent":[155557.85643452048,5402518.81556998,156748.9749860085,5403394.942946513],"ind_jeune":null,"serv_par":0.01033,"tx_tot_et":null,"tx_f":null,"brev":65.1,"tx_abcde":15.0},{"code_qp":"QP031009","nom_qp":"Bourbaki","cod_com":"31555","com":"Toulouse","area":5.7505,"pop_mun":1169,"densite":203.28,"extent":[158930.83700555668,5407146.32134711,159442.90666320574,5407484.635196466],"ind_jeune":null,"serv_par":0.00086,"tx_tot_et":19,"tx_f":53.9,"brev":67.2,"tx_abcde":18.6},{"code_qp":"QP031006","nom_qp":"Pradettes","cod_com":"31555","com":"Toulouse","area":17.4695,"pop_mun":1962,"densite":112.31,"extent":[153865.80017446273,5400413.375069859,154800.88389712624,5401150.993124753],"ind_jeune":null,"serv_par":0.01580,"tx_tot_et":25,"tx_f":47.8,"brev":63.6,"tx_abcde":22.0},{"code_qp":"QP031007","nom_qp":"Grand Mirail","cod_com":"31555","com":"Toulouse","area":288.8861,"pop_mun":31691,"densite":109.70,"extent":[154834.2797443642,5397340.599250526,157884.43379209988,5401658.139653183],"ind_jeune":1.7000000000000002,"serv_par":0.00767,"tx_tot_et":25,"tx_f":51.6,"brev":69.1,"tx_abcde":21.2},{"code_qp":"QP031013","nom_qp":"Saint Exupéry","cod_com":"31555","com":"Toulouse","area":9.6201,"pop_mun":1288,"densite":133.89,"extent":[164663.79078141027,5399721.911545284,165287.17992985257,5400336.543237519],"ind_jeune":null,"serv_par":0.00543,"tx_tot_et":null,"tx_f":55.1,"brev":54.8,"tx_abcde":20.8},{"code_qp":"QP031014","nom_qp":"Soupetard","cod_com":"31555","com":"Toulouse","area":13.0434,"pop_mun":2021,"densite":154.94,"extent":[164040.40163296793,5404978.331002461,164763.9783231242,5406039.198934747],"ind_jeune":1.5,"serv_par":0.00693,"tx_tot_et":18,"tx_f":54,"brev":57.3,"tx_abcde":22.5},{"code_qp":"QP031015","nom_qp":"Rangueil","cod_com":"31555","com":"Toulouse","area":18.5441,"pop_mun":3311,"densite":178.55,"extent":[162737.96359068662,5398369.865508536,163606.25561887416,5399721.911545284],"ind_jeune":4.3,"serv_par":0.00091,"tx_tot_et":24,"tx_f":50.8,"brev":57.4,"tx_abcde":5.2},{"code_qp":"QP031011","nom_qp":"Les Izards - La Vache","cod_com":"31555","com":"Toulouse","area":46.5736,"pop_mun":2747,"densite":58.98,"extent":[159531.96225584036,5408776.492884096,160923.45589075628,5410437.718118893],"ind_jeune":1.1,"serv_par":0.01493,"tx_tot_et":24,"tx_f":48,"brev":61.9,"tx_abcde":21.3},{"code_qp":"QP031018","nom_qp":"Négreneys","cod_com":"31555","com":"Toulouse","area":6.1269,"pop_mun":1014,"densite":165.50,"extent":[160155.3514042827,5406546.613583988,160967.98368707357,5407115.5661565205],"ind_jeune":null,"serv_par":0.00493,"tx_tot_et":null,"tx_f":49.2,"brev":62.5,"tx_abcde":26.4},{"code_qp":"QP031008","nom_qp":"Arènes","cod_com":"31555","com":"Toulouse","area":13.1036,"pop_mun":2127,"densite":162.32,"extent":[157249.91269457823,5402272.899993863,158095.94082460713,5402979.924897194],"ind_jeune":null,"serv_par":0.01457,"tx_tot_et":14,"tx_f":48.8,"brev":47.7,"tx_abcde":15.1}]}]},{"cod_dep":"32","nom_dep":"Gers","area":22.0570,"brev":76.2,"tx_abcde":16.6,"tx_f":56.6,"tx_tot_et":24.0,"densite":87.91,"ind_jeune":2.0,"extent":[54312.77955803817,5406438.977846555,72023.710543248,5420318.949655614],"data_com":[{"cod_com":"32013","com":"Auch","pop_mun":1939,"area":22.0570,"brev":76.2,"tx_abcde":16.6,"tx_f":56.6,"tx_tot_et":24.0,"densite":87.91,"ind_jeune":2.0,"extent":[54312.77955803817,5406438.977846555,72023.710543248,5420318.949655614],"dataqp":[{"code_qp":"QP032001","nom_qp":"Grand Garros","cod_com":"32013","com":"Auch","area":22.0570,"pop_mun":1939,"densite":87.91,"extent":[65767.55516066603,5408714.971757221,66758.29862872616,5409776.268592285],"ind_jeune":2,"serv_par":0.00619,"tx_tot_et":24,"tx_f":56.6,"brev":76.2,"tx_abcde":16.6}]}]},{"cod_dep":"34","nom_dep":"Hérault","area":822.9139,"brev":69.3,"tx_abcde":19.6,"tx_f":52.5,"tx_tot_et":20.0,"densite":124.12,"ind_jeune":1.6,"extent":[347561.7141547587,5352945.280912534,463578.88745950843,5428992.979956648],"data_com":[{"cod_com":"34003","com":"Agde","pop_mun":3177,"area":35.6703,"brev":60.6,"tx_abcde":26.6,"tx_f":52.5,"tx_tot_et":null,"densite":89.07,"ind_jeune":1.0,"extent":[381625.4783375004,5352945.280912534,394015.3376627918,5365811.401172718],"dataqp":[{"code_qp":"QP034019","nom_qp":"Centre Ville","cod_com":"34003","com":"Agde","area":35.6703,"pop_mun":3177,"densite":89.07,"extent":[385811.09119132755,5359093.09598202,386790.70271030837,5360286.426520918],"ind_jeune":1,"serv_par":0.02392,"tx_tot_et":null,"tx_f":52.5,"brev":60.6,"tx_abcde":26.6}]},{"cod_com":"34028","com":"Bédarieux","pop_mun":1955,"area":20.7764,"brev":52.7,"tx_abcde":16.3,"tx_f":52.2,"tx_tot_et":7.0,"densite":94.10,"ind_jeune":0.7,"extent":[347561.7141547587,5401320.038878587,357046.13477034564,5409653.213438111],"dataqp":[{"code_qp":"QP034020","nom_qp":"Centre Ville","cod_com":"34028","com":"Bédarieux","area":20.7764,"pop_mun":1955,"densite":94.10,"extent":[350990.3544711916,5405762.439044224,352003.36183741037,5406623.497020768],"ind_jeune":0.7,"serv_par":0.04348,"tx_tot_et":7,"tx_f":52.2,"brev":52.7,"tx_abcde":16.3}]},{"cod_com":"34032","com":"Béziers","pop_mun":26491,"area":282.3199,"brev":71.9,"tx_abcde":21.2,"tx_f":52.1,"tx_tot_et":20.6,"densite":93.83,"ind_jeune":1.4,"extent":[348307.55474307365,5357303.387267632,371907.28679124766,5372902.261791526],"dataqp":[{"code_qp":"QP034002","nom_qp":"Iranget Grangette","cod_com":"34032","com":"Béziers","area":23.1389,"pop_mun":2832,"densite":122.39,"extent":[359907.0456837328,5364341.835216399,360608.3584757304,5365811.401172718],"ind_jeune":1.2,"serv_par":0.00918,"tx_tot_et":19,"tx_f":56.2,"brev":73,"tx_abcde":20.5},{"code_qp":"QP034001","nom_qp":"Centre Ville","cod_com":"34032","com":"Béziers","area":210.9841,"pop_mun":19054,"densite":90.31,"extent":[356211.23858939606,5362627.635276485,359550.8233131943,5365535.839850931],"ind_jeune":1.4,"serv_par":0.02293,"tx_tot_et":20,"tx_f":51.1,"brev":70.2,"tx_abcde":23.3},{"code_qp":"QP034003","nom_qp":"Devèze","cod_com":"34032","com":"Béziers","area":48.1969,"pop_mun":4605,"densite":95.55,"extent":[361432.12270760065,5362551.115865433,362957.19973146846,5364127.542931364],"ind_jeune":1.3,"serv_par":0.02432,"tx_tot_et":24,"tx_f":53.7,"brev":78.5,"tx_abcde":13.2}]},{"cod_com":"34108","com":"Frontignan","pop_mun":1231,"area":6.6903,"brev":63.4,"tx_abcde":0.0,"tx_f":56.2,"tx_tot_et":13.0,"densite":184.00,"ind_jeune":1.4,"extent":[408809.6979892179,5375507.177348869,425919.50372414396,5385934.159996809],"dataqp":[{"code_qp":"QP034016","nom_qp":"Les Deux Pins","cod_com":"34108","com":"Frontignan","area":6.6903,"pop_mun":1231,"densite":184.00,"extent":[417214.31954411,5380550.5330907395,417859.97259071097,5381301.905841866],"ind_jeune":1.4,"serv_par":0.00244,"tx_tot_et":13,"tx_f":56.2,"brev":63.4,"tx_abcde":0.0}]},{"cod_com":"34142","com":"Lodève","pop_mun":3021,"area":38.3424,"brev":61.7,"tx_abcde":20.6,"tx_f":53.5,"tx_tot_et":10.0,"densite":78.79,"ind_jeune":1.1,"extent":[362077.77575420163,5418240.242543704,372063.13407835824,5428992.979956648],"dataqp":[{"code_qp":"QP034022","nom_qp":"Centre Ville","cod_com":"34142","com":"Lodève","area":38.3424,"pop_mun":3021,"densite":78.79,"extent":[368690.1535073221,5423276.139688108,370126.1749385553,5424693.462486552],"ind_jeune":1.1,"serv_par":0.03674,"tx_tot_et":10,"tx_f":53.5,"brev":61.7,"tx_abcde":20.6}]},{"cod_com":"34145","com":"Lunel","pop_mun":5726,"area":46.7614,"brev":64.3,"tx_abcde":27.5,"tx_f":52.6,"tx_tot_et":24.0,"densite":122.45,"ind_jeune":1.4,"extent":[456365.38445610437,5410068.531150167,463578.88745950843,5421412.383478896],"dataqp":[{"code_qp":"QP034021","nom_qp":"Centre Et Périphérie","cod_com":"34145","com":"Lunel","area":46.7614,"pop_mun":5726,"densite":122.45,"extent":[459092.7119805396,5414453.579159827,460940.61552770785,5416038.863093855],"ind_jeune":1.4,"serv_par":0.01659,"tx_tot_et":24,"tx_f":52.6,"brev":64.3,"tx_abcde":27.5}]},{"cod_com":"34172","com":"Montpellier","pop_mun":52402,"area":358.1537,"brev":70.8,"tx_abcde":18.2,"tx_f":52.4,"tx_tot_et":22.7,"densite":146.31,"ind_jeune":1.8,"extent":[423871.2250935477,5398631.040826345,438732.3771144498,5411929.999074457],"dataqp":[{"code_qp":"QP034011","nom_qp":"Lemasson","cod_com":"34172","com":"Montpellier","area":4.3670,"pop_mun":1245,"densite":285.09,"extent":[430884.353013524,5402395.856964722,431251.7073331418,5402826.21923405],"ind_jeune":1.7000000000000002,"serv_par":0.00482,"tx_tot_et":null,"tx_f":57.3,"brev":55.8,"tx_abcde":18.6},{"code_qp":"QP034015","nom_qp":"Vert-Bois","cod_com":"34172","com":"Montpellier","area":9.9639,"pop_mun":2012,"densite":201.93,"extent":[430294.35971231974,5409084.104660757,430839.8252172067,5409822.414697508],"ind_jeune":null,"serv_par":0.00895,"tx_tot_et":18,"tx_f":53.4,"brev":59,"tx_abcde":10.4},{"code_qp":"QP034014","nom_qp":"Aiguelongue","cod_com":"34172","com":"Montpellier","area":11.5790,"pop_mun":1095,"densite":94.57,"extent":[431552.2699582837,5407684.553745239,432186.7910558053,5408422.751996201],"ind_jeune":1.7000000000000002,"serv_par":0.01005,"tx_tot_et":null,"tx_f":50.7,"brev":63.9,"tx_abcde":21.5},{"code_qp":"QP034013","nom_qp":"Pompignane","cod_com":"34172","com":"Montpellier","area":6.7267,"pop_mun":1198,"densite":178.10,"extent":[433945.63901033904,5406485.107294879,434569.02815878135,5407054.05608228],"ind_jeune":2.1,"serv_par":0.00668,"tx_tot_et":8,"tx_f":52.5,"brev":59.3,"tx_abcde":19.0},{"code_qp":"QP034010","nom_qp":"Figuerolles","cod_com":"34172","com":"Montpellier","area":16.7511,"pop_mun":3419,"densite":204.11,"extent":[430049.45683257445,5404501.748797778,431084.7280969519,5405132.072437051],"ind_jeune":1.3,"serv_par":0.02896,"tx_tot_et":20,"tx_f":50.2,"brev":53.9,"tx_abcde":17.5},{"code_qp":"QP034009","nom_qp":"Gély","cod_com":"34172","com":"Montpellier","area":9.5394,"pop_mun":1324,"densite":138.79,"extent":[429080.97726267297,5404501.748797778,429971.53318901913,5404947.583022263],"ind_jeune":1.3,"serv_par":0.00378,"tx_tot_et":7,"tx_f":58.4,"brev":72.5,"tx_abcde":13.4},{"code_qp":"QP034007","nom_qp":"Pas Du Loup - Val De Croze","cod_com":"34172","com":"Montpellier","area":28.2024,"pop_mun":3245,"densite":115.06,"extent":[427099.49032655265,5402595.665528261,428524.37980870664,5403948.32931525],"ind_jeune":1.6,"serv_par":0.00555,"tx_tot_et":12,"tx_f":56,"brev":67.4,"tx_abcde":18.7},{"code_qp":"QP034006","nom_qp":"Petit Bard Pergola","cod_com":"34172","com":"Montpellier","area":30.0503,"pop_mun":5756,"densite":191.55,"extent":[426643.08041430026,5405624.062205318,427578.1641369638,5406854.151167245],"ind_jeune":1.8,"serv_par":0.00834,"tx_tot_et":35,"tx_f":49.9,"brev":76.6,"tx_abcde":17.5},{"code_qp":"QP034004","nom_qp":"Celleneuve","cod_com":"34172","com":"Montpellier","area":11.4173,"pop_mun":1420,"densite":124.37,"extent":[425429.6979646536,5405547.187078487,426119.87880757195,5406069.950545054],"ind_jeune":null,"serv_par":0.02254,"tx_tot_et":null,"tx_f":51.7,"brev":56.1,"tx_abcde":18.2},{"code_qp":"QP034008","nom_qp":"Cévennes","cod_com":"34172","com":"Montpellier","area":31.1489,"pop_mun":5578,"densite":179.08,"extent":[427767.4072713123,5406362.095944129,429192.29675346625,5407530.769862458],"ind_jeune":2.1,"serv_par":0.01112,"tx_tot_et":27,"tx_f":49.8,"brev":65.2,"tx_abcde":19.8},{"code_qp":"QP034005","nom_qp":"Mosson","cod_com":"34172","com":"Montpellier","area":137.0099,"pop_mun":21652,"densite":158.03,"extent":[424194.0516168482,5406792.642832205,425808.18423335074,5410530.017165585],"ind_jeune":2.2,"serv_par":0.00998,"tx_tot_et":28,"tx_f":52.8,"brev":80.1,"tx_abcde":18.1},{"code_qp":"QP034012","nom_qp":"Près D'Arènes","cod_com":"34172","com":"Montpellier","area":61.3978,"pop_mun":4458,"densite":72.61,"extent":[431385.2907220938,5400674.608072232,433043.9511349135,5402856.960162345],"ind_jeune":1.7000000000000002,"serv_par":0.01638,"tx_tot_et":15,"tx_f":52.7,"brev":59.4,"tx_abcde":21.2}]},{"cod_com":"34301","com":"Sète","pop_mun":8134,"area":34.1995,"brev":66.0,"tx_abcde":18.7,"tx_f":53.9,"tx_tot_et":13.1,"densite":237.84,"ind_jeune":1.2,"extent":[395518.15078850096,5361724.74636322,414676.23515402334,5377683.608586736],"dataqp":[{"code_qp":"QP034018","nom_qp":"Centre Ville - Ile Sud","cod_com":"34301","com":"Sète","area":19.9922,"pop_mun":4340,"densite":217.08,"extent":[410891.3724670521,5373009.508590392,411993.4354259055,5374250.597396484],"ind_jeune":0.8,"serv_par":0.03664,"tx_tot_et":8,"tx_f":53.5,"brev":52.2,"tx_abcde":22.2},{"code_qp":"QP034017","nom_qp":"Ile De Thau","cod_com":"34301","com":"Sète","area":14.2073,"pop_mun":3794,"densite":267.05,"extent":[407418.20435430197,5374679.6543494025,408208.57273893413,5375415.22670495],"ind_jeune":1.7000000000000002,"serv_par":0.00237,"tx_tot_et":19,"tx_f":54.4,"brev":81.7,"tx_abcde":14.8}]}]},{"cod_dep":"46","nom_dep":"Lot","area":26.1155,"brev":54.0,"tx_abcde":22.2,"tx_f":52.2,"tx_tot_et":21.0,"densite":39.67,"ind_jeune":1.7,"extent":[152774.86916468866,5527677.861491642,167524.7016947974,5545035.889158773],"data_com":[{"cod_com":"46042","com":"Cahors","pop_mun":1036,"area":26.1155,"brev":54.0,"tx_abcde":22.2,"tx_f":52.2,"tx_tot_et":21.0,"densite":39.67,"ind_jeune":1.7,"extent":[152774.86916468866,5527677.861491642,167524.7016947974,5545035.889158773],"dataqp":[{"code_qp":"QP046001","nom_qp":"Terre Rouge","cod_com":"46042","com":"Cahors","area":26.1155,"pop_mun":1036,"densite":39.67,"extent":[161268.54631221542,5536672.457252236,162481.9287618621,5538029.432327506],"ind_jeune":1.7000000000000002,"serv_par":0.01737,"tx_tot_et":21,"tx_f":52.2,"brev":54,"tx_abcde":22.2}]}]},{"cod_dep":"65","nom_dep":"Hautes-Pyrénées","area":99.7272,"brev":64.4,"tx_abcde":19.9,"tx_f":55.4,"tx_tot_et":14.9,"densite":83.77,"ind_jeune":1.4,"extent":[-16319.437350293907,5322038.358969602,10352.712643774443,5352379.641351073],"data_com":[{"cod_com":"65286","com":"Lourdes","pop_mun":1165,"area":9.7168,"brev":60.8,"tx_abcde":23.9,"tx_f":51.5,"tx_tot_et":25.0,"densite":119.90,"ind_jeune":1.9,"extent":[-16319.437350293907,5322038.358969602,-1658.6604128197762,5335105.971423394],"dataqp":[{"code_qp":"QP065004","nom_qp":"Ophite","cod_com":"65286","com":"Lourdes","area":9.7168,"pop_mun":1165,"densite":119.89,"extent":[-4864.661747666055,5324705.288617311,-4497.307428048252,5325604.596606649],"ind_jeune":1.9,"serv_par":0.00000,"tx_tot_et":25,"tx_f":51.5,"brev":60.8,"tx_abcde":23.9}]},{"cod_com":"65440","com":"Tarbes","pop_mun":7189,"area":90.0104,"brev":65.0,"tx_abcde":19.2,"tx_f":56.0,"tx_tot_et":13.3,"densite":79.87,"ind_jeune":1.3,"extent":[4241.272599223724,5344357.376163463,10352.712643774443,5352379.641351073],"dataqp":[{"code_qp":"QP065001","nom_qp":"Tarbes Ouest","cod_com":"65440","com":"Tarbes","area":9.6258,"pop_mun":1516,"densite":157.49,"extent":[5465.786997949732,5346694.579904613,6278.419280740629,5347275.152819274],"ind_jeune":2.5,"serv_par":0.00066,"tx_tot_et":20,"tx_f":50.6,"brev":77.9,"tx_abcde":16.6},{"code_qp":"QP065003","nom_qp":"Tarbes Est","cod_com":"65440","com":"Tarbes","area":43.9165,"pop_mun":3316,"densite":75.51,"extent":[8616.128587399373,5345701.578554069,10219.129254822516,5347473.778179046],"ind_jeune":0.8,"serv_par":0.02292,"tx_tot_et":9,"tx_f":57.1,"brev":54.6,"tx_abcde":17.9},{"code_qp":"QP065002","nom_qp":"Tarbes Nord","cod_com":"65440","com":"Tarbes","area":36.4681,"pop_mun":2357,"densite":64.63,"extent":[6066.91224823341,5348650.338343263,7825.760202767132,5349628.371640891],"ind_jeune":1.3,"serv_par":0.00509,"tx_tot_et":15,"tx_f":57.9,"brev":71.2,"tx_abcde":22.7}]}]},{"cod_dep":"66","nom_dep":"Pyrénées-Orientales","area":255.4699,"brev":69.0,"tx_abcde":15.8,"tx_f":50.6,"tx_tot_et":13.0,"densite":131.57,"ind_jeune":1.9,"extent":[314611.1448799498,5248668.700159507,338901.05777104205,5273814.471585605],"data_com":[{"cod_com":"66065","com":"Elne","pop_mun":1226,"area":11.3745,"brev":50.2,"tx_abcde":27.1,"tx_f":51.7,"tx_tot_et":10.0,"densite":107.78,"ind_jeune":1.3,"extent":[324140.09329185396,5248668.700159507,338901.05777104205,5256382.413389567],"dataqp":[{"code_qp":"QP066001","nom_qp":"Centre Ville","cod_com":"66065","com":"Elne","area":11.3745,"pop_mun":1226,"densite":107.78,"extent":[330585.4918087845,5251027.518573801,331231.1448553855,5251481.205195286],"ind_jeune":1.3,"serv_par":0.02529,"tx_tot_et":10,"tx_f":51.7,"brev":50.2,"tx_abcde":27.1}]},{"cod_com":"66136","com":"Perpignan","pop_mun":32385,"area":244.0954,"brev":69.7,"tx_abcde":15.4,"tx_f":50.6,"tx_tot_et":13.1,"densite":132.67,"ind_jeune":1.9,"extent":[314611.1448799498,5258728.029478918,332032.64518909703,5273814.471585605],"dataqp":[{"code_qp":"QP066005","nom_qp":"Diagonale Du Haut - Moyen-Vernet","cod_com":"66136","com":"Perpignan","area":59.5113,"pop_mun":5101,"densite":85.71,"extent":[320655.7932300245,5268373.897814641,323049.1622820799,5270631.581003911],"ind_jeune":2.2,"serv_par":0.01059,"tx_tot_et":25,"tx_f":50,"brev":80.3,"tx_abcde":13.2},{"code_qp":"QP066006","nom_qp":"Rois De Majorque","cod_com":"66136","com":"Perpignan","area":7.7764,"pop_mun":1581,"densite":203.31,"extent":[321947.0993232265,5264102.450385802,322336.71754100296,5264783.934278339],"ind_jeune":null,"serv_par":0.00316,"tx_tot_et":null,"tx_f":50.4,"brev":82.2,"tx_abcde":15.0},{"code_qp":"QP066009","nom_qp":"Quartier Nouveau Logis","cod_com":"66136","com":"Perpignan","area":18.2427,"pop_mun":994,"densite":54.49,"extent":[321935.96737414715,5270070.897662644,323093.6900783972,5270813.431431854],"ind_jeune":null,"serv_par":0.02716,"tx_tot_et":null,"tx_f":53.8,"brev":null,"tx_abcde":0.0},{"code_qp":"QP066008","nom_qp":"Quartier Centre Ancien","cod_com":"66136","com":"Perpignan","area":44.9209,"pop_mun":11358,"densite":252.84,"extent":[321702.1964434813,5265465.467544164,323205.00956919044,5266525.728565896],"ind_jeune":2.4,"serv_par":0.01567,"tx_tot_et":10,"tx_f":47.6,"brev":71.1,"tx_abcde":12.7},{"code_qp":"QP066004","nom_qp":"Quartier Bas-Vernet Ancien Zus","cod_com":"66136","com":"Perpignan","area":16.1140,"pop_mun":2828,"densite":175.50,"extent":[320099.1957760582,5266737.795113844,320911.8280588491,5267525.51273297],"ind_jeune":2.7,"serv_par":0.00354,"tx_tot_et":28,"tx_f":51.2,"brev":87.8,"tx_abcde":16.6},{"code_qp":"QP066002","nom_qp":"Quartier Saint Assiscle","cod_com":"66136","com":"Perpignan","area":22.0364,"pop_mun":2630,"densite":119.35,"extent":[318941.4730718081,5264693.066906903,319754.105354599,5266192.490794174],"ind_jeune":1.7000000000000002,"serv_par":0.01559,"tx_tot_et":null,"tx_f":53.2,"brev":57.6,"tx_abcde":20.0},{"code_qp":"QP066007","nom_qp":"Bas-Vernet Nouveau QPV","cod_com":"66136","com":"Perpignan","area":28.3409,"pop_mun":2854,"densite":100.70,"extent":[321512.9533091327,5266949.86644379,322882.18304589,5267949.695705894],"ind_jeune":0.8,"serv_par":0.01086,"tx_tot_et":15,"tx_f":52.3,"brev":56.3,"tx_abcde":19.2},{"code_qp":"QP066010","nom_qp":"Quartier Champs De Mars","cod_com":"66136","com":"Perpignan","area":9.0607,"pop_mun":1609,"densite":177.58,"extent":[323538.96804157033,5264844.513013596,323984.2460047434,5265632.072075603],"ind_jeune":1.7000000000000002,"serv_par":0.00062,"tx_tot_et":21,"tx_f":55.5,"brev":84.1,"tx_abcde":20.3},{"code_qp":"QP066003","nom_qp":"Quartier Gare","cod_com":"66136","com":"Perpignan","area":38.0921,"pop_mun":3430,"densite":90.04,"extent":[320110.32772513747,5264541.623238323,321012.015600563,5266510.581138303],"ind_jeune":1.6,"serv_par":0.01399,"tx_tot_et":8,"tx_f":54.1,"brev":62.1,"tx_abcde":22.0}]}]},{"cod_dep":"81","nom_dep":"Tarn","area":307.9177,"brev":66.8,"tx_abcde":20.7,"tx_f":54.7,"tx_tot_et":11.9,"densite":60.03,"ind_jeune":1.3,"extent":[204449.3767909262,5383326.314989992,265163.02706957766,5478001.1846768],"data_com":[{"cod_com":"81004","com":"Albi","pop_mun":5132,"area":52.1266,"brev":74.9,"tx_abcde":23.3,"tx_f":57.2,"tx_tot_et":15.3,"densite":98.45,"ind_jeune":1.6,"extent":[228505.5187513527,5448188.037461439,246216.44973656253,5460723.450609843],"dataqp":[{"code_qp":"QP081008","nom_qp":"Lapanouse","cod_com":"81004","com":"Albi","area":12.8917,"pop_mun":1244,"densite":96.50,"extent":[240238.5930809637,5453827.631158289,241184.8087527065,5454631.361662252],"ind_jeune":null,"serv_par":0.00965,"tx_tot_et":null,"tx_f":59.9,"brev":72.2,"tx_abcde":23.8},{"code_qp":"QP081006","nom_qp":"Cantepau","cod_com":"81004","com":"Albi","area":18.9099,"pop_mun":2106,"densite":111.37,"extent":[239503.88444172806,5456254.493255362,240294.2528263603,5457197.587059997],"ind_jeune":2.6,"serv_par":0.00427,"tx_tot_et":23,"tx_f":55.6,"brev":85.9,"tx_abcde":25.8},{"code_qp":"QP081007","nom_qp":"Veyrières Rayssac","cod_com":"81004","com":"Albi","area":20.3250,"pop_mun":1782,"densite":87.68,"extent":[237032.59174611745,5451895.874061249,238379.557584716,5452915.791238649],"ind_jeune":1.5,"serv_par":0.01122,"tx_tot_et":17,"tx_f":57.2,"brev":63.9,"tx_abcde":20.1}]},{"cod_com":"81021","com":"Aussillon","pop_mun":1283,"area":21.8411,"brev":71.8,"tx_abcde":15.0,"tx_f":52.6,"tx_tot_et":24.0,"densite":58.74,"ind_jeune":1.1,"extent":[258673.1007563298,5383326.314989992,265163.02706957766,5391182.754734762],"dataqp":[{"code_qp":"QP081001","nom_qp":"La Falgalarié","cod_com":"81021","com":"Aussillon","area":21.8411,"pop_mun":1283,"densite":58.74,"extent":[262791.9219156809,5388696.207663018,263727.00563834445,5389724.513482899],"ind_jeune":1.1,"serv_par":0.00234,"tx_tot_et":24,"tx_f":52.6,"brev":71.8,"tx_abcde":15.0}]},{"cod_com":"81060","com":"Carmaux","pop_mun":1877,"area":50.3835,"brev":56.1,"tx_abcde":17.7,"tx_f":55.5,"tx_tot_et":11.0,"densite":37.25,"ind_jeune":0.5,"extent":[238223.71029760546,5469822.718476674,243901.00432806238,5478001.1846768],"dataqp":[{"code_qp":"QP081009","nom_qp":"Rajol - Cérou - Gourgatieux - Bouloc - Verrerie","cod_com":"81060","com":"Carmaux","area":50.3835,"pop_mun":1877,"densite":37.25,"extent":[239014.07868223768,5472950.740237103,240617.07934966084,5474375.737372966],"ind_jeune":0.5,"serv_par":0.02451,"tx_tot_et":11,"tx_f":55.5,"brev":56.1,"tx_abcde":17.7}]},{"cod_com":"81065","com":"Castres","pop_mun":6317,"area":83.8191,"brev":66.7,"tx_abcde":21.5,"tx_f":52.9,"tx_tot_et":5.2,"densite":75.36,"ind_jeune":1.7,"extent":[240038.2179975358,5396987.295431028,259730.63591886594,5414561.308285926],"dataqp":[{"code_qp":"QP081004","nom_qp":"Aillot Bisséous Lardaillé","cod_com":"81065","com":"Castres","area":40.2456,"pop_mun":2116,"densite":52.58,"extent":[250335.27089591362,5404148.171419335,251760.16037806752,5406085.326388563],"ind_jeune":2,"serv_par":0.00614,"tx_tot_et":7,"tx_f":54.9,"brev":65.9,"tx_abcde":18.1},{"code_qp":"QP081002","nom_qp":"Laden Petit Train","cod_com":"81065","com":"Castres","area":12.7557,"pop_mun":1254,"densite":98.31,"extent":[247886.24209846157,5402795.478407919,248687.74243217314,5403487.171708661],"ind_jeune":2.3,"serv_par":0.00399,"tx_tot_et":null,"tx_f":47.8,"brev":77.6,"tx_abcde":21.1},{"code_qp":"QP081005","nom_qp":"Centre Ville","cod_com":"81065","com":"Castres","area":14.9246,"pop_mun":1649,"densite":110.49,"extent":[249066.2287008703,5404163.544067741,249923.38877997847,5405070.575556491],"ind_jeune":0.9,"serv_par":0.05155,"tx_tot_et":null,"tx_f":50.9,"brev":52.5,"tx_abcde":21.0},{"code_qp":"QP081003","nom_qp":"Lameilhé","cod_com":"81065","com":"Castres","area":15.8932,"pop_mun":1298,"densite":81.67,"extent":[249800.9373401059,5402272.899993863,251036.58368791125,5403010.666336323],"ind_jeune":1.7000000000000002,"serv_par":0.00770,"tx_tot_et":14,"tx_f":57.3,"brev":75.5,"tx_abcde":28.0}]},{"cod_com":"81099","com":"Gaillac","pop_mun":1173,"area":30.4837,"brev":61.6,"tx_abcde":14.2,"tx_f":55.2,"tx_tot_et":18.0,"densite":38.48,"ind_jeune":1.0,"extent":[204449.3767909262,5444775.058980742,216082.26357882333,5458852.100160091],"dataqp":[{"code_qp":"QP081010","nom_qp":"Lentajou - Catalanis","cod_com":"81099","com":"Gaillac","area":30.4837,"pop_mun":1173,"densite":38.48,"extent":[210215.72641401784,5449686.441461544,212119.28970658276,5451525.02313151],"ind_jeune":1,"serv_par":0.01279,"tx_tot_et":18,"tx_f":55.2,"brev":61.6,"tx_abcde":14.2}]},{"cod_com":"81105","com":"Graulhet","pop_mun":2701,"area":69.2637,"brev":59.2,"tx_abcde":21.2,"tx_f":54.7,"tx_tot_et":13.0,"densite":39.00,"ind_jeune":0.7,"extent":[214924.5408745733,5421581.800309005,229796.8248445546,5434898.451990613],"dataqp":[{"code_qp":"QP081011","nom_qp":"Crins - En Gach","cod_com":"81105","com":"Graulhet","area":69.2637,"pop_mun":2701,"densite":39.00,"extent":[220000.70965474655,5428376.438586407,222928.41226260967,5429624.977646037],"ind_jeune":0.7,"serv_par":0.01925,"tx_tot_et":13,"tx_f":54.7,"brev":59.2,"tx_abcde":21.2}]}]},{"cod_dep":"82","nom_dep":"Tarn-et-Garonne","area":141.9133,"brev":59.3,"tx_abcde":15.9,"tx_f":52.8,"tx_tot_et":22.9,"densite":77.69,"ind_jeune":1.2,"extent":[112232.31061777842,5458048.000513114,160578.3654692971,5491632.678806593],"data_com":[{"cod_com":"82112","com":"Moissac","pop_mun":3672,"area":58.7852,"brev":61.4,"tx_abcde":27.0,"tx_f":50.6,"tx_tot_et":28.6,"densite":62.46,"ind_jeune":0.9,"extent":[112232.31061777842,5477102.435914208,132815.2844654547,5491632.678806593],"dataqp":[{"code_qp":"QP082003","nom_qp":"Centre Ville","cod_com":"82112","com":"Moissac","area":42.5147,"pop_mun":2470,"densite":58.10,"extent":[119445.81362118253,5480914.976131576,121382.7727609855,5482000.135182009],"ind_jeune":0.9,"serv_par":0.02915,"tx_tot_et":25,"tx_f":50.6,"brev":59.1,"tx_abcde":31.3},{"code_qp":"QP082004","nom_qp":"Sarlac","cod_com":"82112","com":"Moissac","area":16.2705,"pop_mun":1202,"densite":73.88,"extent":[122050.68970574516,5480620.455130014,122718.60665050478,5481767.590282516],"ind_jeune":1,"serv_par":0.00416,"tx_tot_et":36,"tx_f":50.7,"brev":66.1,"tx_abcde":18.3}]},{"cod_com":"82121","com":"Montauban","pop_mun":7353,"area":83.1281,"brev":58.2,"tx_abcde":10.4,"tx_f":53.9,"tx_tot_et":20.1,"densite":88.45,"ind_jeune":1.3,"extent":[143223.6568546258,5458048.000513114,160578.3654692971,5479674.951664917],"dataqp":[{"code_qp":"QP082002","nom_qp":"Médiathèque - Chambord","cod_com":"82121","com":"Montauban","area":58.2149,"pop_mun":3802,"densite":65.31,"extent":[152340.7231505949,5466757.672136249,154366.73788303247,5468166.227947608],"ind_jeune":1.3,"serv_par":0.00763,"tx_tot_et":23,"tx_f":55,"brev":64.5,"tx_abcde":0.0},{"code_qp":"QP082001","nom_qp":"Cœur de Ville","cod_com":"82121","com":"Montauban","area":24.9132,"pop_mun":3551,"densite":142.53,"extent":[150359.2362144746,5467887.595363693,151138.4726500275,5468986.695233567],"ind_jeune":1.4,"serv_par":0.03182,"tx_tot_et":17,"tx_f":52.8,"brev":51.4,"tx_abcde":21.5}]}]}];
    var menu_sel_reg = [{"cod_reg":"76","brev":64.9,"tx_abcde":18.8,"tx_f":52.9,"tx_tot_et":18,"densite":89.75,"ind_jeune":1.5,"extent":[124933.86451729095,5301490.437585138,187517.68224126933,5337898.744833214]}];
    var data = [];

    var level_n1 = 1;
    var counter_n1 = 1;

    var level_n2 = 2;
    var counter_n2 = 1;

    var level_n3 = 3;
    var counter_n3 = 1;
    // level 1 (départements)

    var indexed_data = {
        'dep':{},
        'com':{},
        'qpv':{},
    };

    var selected_data = {
        'dep':[],
        'com':[],
        'qpv':[]
    };

    for (var i in menu_sel_data) {
        
        data.unshift({
            id: level_n1 + '.' + counter_n1,
            parent: '0.0',
            name: menu_sel_data[i]["nom_dep"],
            info : {typ:'dep', val: menu_sel_data[i]["cod_dep"], ext: menu_sel_data[i]["extent"]}
        });
        
        indexed_data['dep'][menu_sel_data[i]["cod_dep"]] = menu_sel_data[i];
        
        // level 2 (communes)
        for (var j in menu_sel_data[i]["data_com"]) {
            data.push({
                id: level_n2 + '.' + counter_n2,
                parent: level_n1 + '.' + counter_n1,
                name: menu_sel_data[i]["data_com"][j]["com"],
                value:menu_sel_data[i]["data_com"][j]["pop_mun"],
                info : {typ:'com', val: menu_sel_data[i]["data_com"][j]["cod_com"], ext: menu_sel_data[i]["data_com"][j]["extent"]}
            }); 
            
            indexed_data['com'][menu_sel_data[i]["data_com"][j]["cod_com"]] = menu_sel_data[i]["data_com"][j];
            
            // level 3 (qpv)
            for (var k in menu_sel_data[i]["data_com"][j]["dataqp"]) {
                data.push({
                    id: level_n3 + '.' + counter_n3,
                    parent: level_n2 + '.' + counter_n2,
                    name: menu_sel_data[i]["data_com"][j]["dataqp"][k]["nom_qp"],
                    value:menu_sel_data[i]["data_com"][j]["dataqp"][k]["pop_mun"],
                    info : {typ:'qpv', val : menu_sel_data[i]["data_com"][j]["dataqp"][k]["code_qp"], ext : menu_sel_data[i]["data_com"][j]["dataqp"][k]["extent"]}
                }); 
                
                indexed_data['qpv'][menu_sel_data[i]["data_com"][j]["dataqp"][k]["code_qp"]] = menu_sel_data[i]["data_com"][j]["dataqp"][k];
                counter_n3++;
            }
            counter_n2++;
        }
        
        counter_n1++;
        
    }

    data.unshift({
        id: '0.0',
        parent: '',
        name: 'Occitanie'
    });

    Highcharts.chart('choixdept', {

        chart: {
            height: '100%'
        },

       // Let the center circle be transparent
        colors: ['transparent'].concat(Highcharts.getOptions().colors),
        
        title: {
            text: undefined
        },

        series: [{
            type: 'sunburst',
            colors:['#f34235','#e81d62','#9b26af','#3e50b4','#02a8f3','#009587','#4bae4f','#ccdb38','#fe9700','#9d9d9d','#000000','yellow'],
            data: data,
            allowDrillToNode: true,
            cursor: 'pointer',
            dataLabels: {
                format: '{point.name}',
                color:'#000',
                filter: {
                    property: 'innerArcLength',
                    operator: '>',
                    value: 16
                },
                rotationMode: 'circular'
            },
            point: {
                events: {
                    click(e) {
                      let series = this.series,
                        clickedLevel = this.node.level,
                        clickedname = this.name,
                        currentOptions = series.userOptions.levels;
                        
                      for (let i of currentOptions) {
                        
                        if ((clickedLevel == 2 && i.level == 3) || (clickedLevel == 3 && i.level == 4)) {
                          if (i.levelSize.value === 0) {
                            i.levelSize = {
                              value: 1
                            };
                            i.dataLabels = {
                                enabled:true
                            };
                          } else { 
                            i.levelSize = {
                              value: 0
                            };
                            i.dataLabels = {
                                enabled:false
                            };
                          }
                        }
                      }

                      series.update({
                        levels: currentOptions
                      });
                      
                      showdetail(this.info);
                      
                    }
                }
            },
            levels: [{
                level: 1,
                levelIsConstant: false,
                dataLabels: {
                    filter: {
                        property: 'outerArcLength',
                        operator: '>',
                        value: 64
                    }
                }
            }, {
                level: 2,
                colorByPoint: true
            },
            {
                level: 3,
                levelIsConstant: false,
                levelSize: {
                    value:0
                },
                dataLabels:{
                    enabled:false
                },
                colorVariation: {
                    key: 'brightness',
                    to: -0.5
                }
            }, {
                level: 4,
                levelSize: {
                    value:0
                },
                dataLabels:{
                    enabled:false
                },
                colorVariation: {
                    key: 'brightness',
                    to: 0.5
                },
                visible:false
            }]

        }],

        tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b>: Population vivant en QPV: <b>{point.value}</b>'
        }
    });
    
    showpolar();
    

    var map = new ol.Map({
        backgroundColor: '#ffffff',
        controls: ol.control.defaults().extend([
            new ol.control.FullScreen()
        ]),
        target: 'map',
        layers: [
          planignv2, bdortho, communesqpv, qpv
        ],
        view: view
    });
    
    
    $('>div','#maplayers').on('click', function(){
        var elem = $(this);
        var clickedname = elem.data("layer");
        map.getLayers().forEach(function(l){
            if (clickedname == l.get('name')) {
                if (l.get('visible')) { 
                    l.setVisible(false);
                    elem.addClass('desactiv');
                } else {
                    l.setVisible(true);
                    elem.removeClass('desactiv');
                }
            }
        });
    });
    

    /* -- Ce qu'il se pqsse quand on sélectionne un élément -- */
    function showdetail(info) {
        // Si pas d'info, zoom global
        if (info === undefined) {
            showpolar();
            zoomtoall();
            $(".btn", "#listes_sel").removeClass("btn-success");
            return;
        } 
        
        // Ajout des zones cliquées dans la sélection, et dans les dropdowns
        if (selected_data[info.typ].indexOf(info.val) == -1) {
            selected_data[info.typ].push(info.val);

            $('button', '#sel_' + info.typ).removeClass('disabled');
            var to_append;
            if (info.typ == 'dep') {
                to_append = '<li id="sel_' + info.typ + '_' + info.val + '"><a class="dropdown-item" href="#">' + indexed_data[info.typ][info.val]['nom_dep'] + '</a></li>';
            } else if (info.typ == 'com') {
                to_append = '<li id="sel_' + info.typ + '_' + info.val + '"><a class="dropdown-item" href="#">' + indexed_data[info.typ][info.val]['com'] + ' (' + indexed_data[info.typ][info.val]['cod_com'].substr(0,2) + ')</a></li>';
            } else {
                to_append = '<li title="' + indexed_data[info.typ][info.val]['cod_com'].substr(0,2) + ' - ' + indexed_data[info.typ][info.val]['com'] + '" id="sel_' + info.typ + '_' + info.val + '"><a class="dropdown-item" href="#">' + indexed_data[info.typ][info.val]['nom_qp'] +'</a></li>';
            }

            $('ul', '#sel_' + info.typ).append(to_append);
            // mettre à jour les badges
            badgeupdate(info.typ);
            // zoomer sur l'emprise des éléments sélectionnés du niveau cliqué (dépt, com., qpv) 
            zoomtoemprise(info.typ);
            showpolar(info.typ);
        }
        
        $(".btn", "#listes_sel").removeClass("btn-success");
        $(".btn", "#sel_" + info.typ).addClass("btn-success");
       
    }

        // supprimer du tableau des éléments séléctionnés
    $(document).on('click', '#listes_sel li', function(){
        var id = $(this).attr('id');
        var splitted = id.split("_");
        var idx_to_del = selected_data[splitted[1]].indexOf(splitted[2]);
        selected_data[splitted[1]].splice(idx_to_del, 1);
        
        // supprimer l'élément de la liste
        $('#' + id).remove();
        badgeupdate(splitted[1]);
        zoomtoemprise(splitted[1]);
        showpolar(splitted[1]);
    });

    $('button','#listes_sel').on('click', function(){
        var splitted = $(this).parent().attr('id').split('_');
        zoomtoemprise(splitted[1]);
        showpolar(splitted[1]);
        $(".btn", "#listes_sel").removeClass("btn-success");
        $(".btn", "#sel_" + splitted[1]).addClass("btn-success");
        
    });

    // Zoom sur l'emprise des éléments sélectionnés
    function zoomtoemprise(typ) {
        // extents = [xmin, ymin, xmax, ymax]
        var extent = [];
        var e;
        for (var i in selected_data[typ]) {
            e = indexed_data[typ][selected_data[typ][i]]['extent'];
            if (extent[0] === undefined) {
               extent = [e[0], e[1], e[2], e[3]];
            }
            if (e[0] < extent[0]) extent[0] = e[0];
            if (e[1] < extent[1]) extent[1] = e[1];
            if (e[2] > extent[2]) extent[2] = e[2];
            if (e[3] > extent[3]) extent[3] = e[3];
        }
        if (extent.length > 0) {
            map.getView().fit(extent, {padding:[5,5,5,5]});
        } else {
            zoomtoall();
        }

        
    }
    // Mise à jour des badges contenus dans le boutons
    function badgeupdate(typ) {
        if (selected_data[typ].length > 0) {
            $("#badge_" + typ).removeClass("visually-hidden").text(selected_data[typ].length);
        } else {
            $("#badge_" + typ).addClass("visually-hidden").text('');
            $('button', '#sel_' + typ).addClass('disabled');
            $(".btn", "#listes_sel").removeClass("btn-success");
        }
        
    }

    // Retour à un zoom initial
    function zoomtoall() {
        map.getView().fit([-36421.08,5210980.66,539406.25,5628870.71]);    
    }
    
    
    // création du graphique radar
    function showpolar(typ) {
        // préparation des données
        var champs = ['densite', 'ind_jeune', 'tx_f', 'tx_tot_et', 'brev', 'tx_abcde'];
        
        var serie = [];
        var to_push;
        var nom;

        if (typ !== undefined) {
            for (var i in selected_data[typ]) {
                var d = indexed_data[typ][selected_data[typ][i]];
                if (typ == 'dep') {
                    nom = d['nom_dep'];
                } else if (typ == 'com') {
                    nom = d['com'];
                } else {
                    nom = d['nom_qp'];
                }

                to_push = {name:nom, data:[d['densite'], d['ind_jeune'], d['tx_f'], d['tx_tot_et'], d['brev'], d['tx_abcde']]};
                serie.push(to_push);
            }
        } else {
            to_push = {name:"Occitanie", data:[menu_sel_reg[0]['densite'], menu_sel_reg[0]['ind_jeune'], menu_sel_reg[0]['tx_f'], menu_sel_reg[0]['tx_tot_et'], menu_sel_reg[0]['brev'], menu_sel_reg[0]['tx_abcde']]};
            serie.push(to_push);         
        }

        Highcharts.chart('polar', {
            title:undefined,
            chart: {
                parallelCoordinates: true,
                polar: true,
                type:'line',
                gridLineWidth: 0,
                lineWidth: 2,
                showFirstLabel: false,
                showLastLabel: true
            },

            pane: {
                size: '80%'
            },

            xAxis: {
                categories: [
                    'Densité pop.(hab/km²)',
                    'Indice jeunesse',
                    'Part des femmes (%)',
                    'Part d\'étrangers (%)',
                    'Taux de bas revenus (%)',
                    'Taux de demandeurs d\'emplois (%)'
                ],
                labels: {
                    style:{fontWeight:'bold'}
                },
                gridLineWidth: 0
            },

            yAxis: [{
                min:0,
                tooltipValueFormat: '{value}h/km²',
                labels:{
                    format: '{text}'
                }
            }, {
                min:0,
            },{
                min:0,
                tooltipValueFormat: '{value}%',
                labels:{
                    format: '{text}'
                }
            },{
                min:0,
                tooltipValueFormat: '{value}%',
                labels:{
                    format: '{text}'
                }
            },{
                min:0,
                tooltipValueFormat: '{value}%',
                labels:{
                    format: '{text}'
                }
            },{
                min:0,
                tooltipValueFormat: '{value}%',
                labels:{
                    format: '{text}'
                }            
            }],

            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
                '{series.name}: <b>{point.formattedValue}</b><br/>'
            },

            legend: {
                enabled:true,
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'vertical'
            },

            series: serie,


        }); 
    }

});

