//	Note:
//	Sub-star color, radius, and offset information are based on best-guesses and not accurate or based on data
//	Please treat this as artist interpretations
//	Offset is in AU
//	Color index is B-V

var starSystems = {
    "268 G. Cet": {
        "id": 12082, 
        "name": "HR 753", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.918, 
                "offset": 0, 
                "radius": 0.79
            },
            {
                "c": 0.97, 
                "offset": 1200, 
                "radius": 0.28
            },
			{
                "c": 1.6, 
                "offset": 24, 
                "radius": 0.1
            }                        
        ]
    }, 
    "33 G. Lib": {
        "id": 72958, 
        "name": "Gliese 570", 
        "sep": 0.000, 
        "sub": [
            {
                "c": 1.024, 
                "offset": 0, 
                "radius": 0.77
            },
            {
                "c": 1.51, 
                "offset": 50, 
                "radius": 0.65
            },
            {
                "c": 1.52, 
                "offset": 66, 
                "radius": 0.6
            }                        
        ]
    }, 
    "82 G. Eri": {
        "id": 15471, 
        "name": "82 G. Eridani", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.711, 
                "offset": 0, 
                "radius": 0.92
            }
        ]
    }, 
    "96 G. Psc": {
        "id": 3759, 
        "name": "96 G. Piscium", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.89, 
                "offset": 0, 
                "radius": 0.69
            }
        ]
    }, 
    "Achernar": {
        "id": 7574, 
        "name": "Achernar", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.158, 
                "offset": 0, 
                "radius": 7.3
            },
            {
                "c": -0.158, 
                "offset": 40.0,  // need to adjust this from 12.3 since it would be too close in the visualization
                "radius": 1.5
            }            
        ]
    }, 
    "Acrux": {
        "id": 60531, 
        "name": "Alpha Crucis", 
        "sep": 430.0, 
        "sub": [
            {
                "c": -0.243, 
                "offset": 0, 
                "radius": 14
            },
            {
                "c": -0.24, 
                "offset": 0, 
                "radius": 14
            },
            {
                "c": -0.24, 
                "offset": 0, 
                "radius": 14
            },                    
        ]
    }, 
    "Adhara": {
        "id": 33492, 
        "name": "Epsilon Canis Majoris", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.211, 
                "offset": 0, 
                "radius": 13.9
            }
        ]
    }, 
    "Alcyone": {
        "id": 17661, 
        "name": "Alcyone", 
        "sep": 5.2, 
        "sub": [
            {
                "c": -0.086, 
                "offset": 0, 
                "radius": 8.2
            },
            {
                "c": -0.02, 
                "offset": 0, 
                "radius": 2.2
            },
            {
                "c": -0.02, 
                "offset": 0, 
                "radius": 2.2
            },
            {
                "c": 0.3, 
                "offset": 0, 
                "radius": 2.2
            }            
        ]
    }, 
    "Aldebaran": {
        "id": 21368, 
        "name": "Aldebaran", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.538, 
                "offset": 0, 
                "radius": 44.2
            }
        ]
    }, 
    "Alderamin": {
        "id": 104862, 
        "name": "Alpha Cephei", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.257, 
                "offset": 0, 
                "radius": 2.3
            }
        ]
    }, 
    "Algenib": {
        "id": 1065, 
        "name": "Gamma Pegasi", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.19, 
                "offset": 0, 
                "radius": 4.8
            }
        ]
    }, 
    "Algieba": {
        "id": 50440, 
        "name": "Gamma Leonis", 
        "sep": 170.0, 
        "sub": [
            {
                "c": 1.128, 
                "offset": 0, 
                "radius": 31.8
            },
            {
                "c": 0.7, 
                "offset": 0, 
                "radius": 10.0            	
            }
        ]
    }, 
    "Algol": {
        "id": 14540, 
        "name": "Algol", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.003, 
                "offset": 0, 
                "radius": 4.13 
            },
            {
                "c": 1.0, 
                "offset": 50.0, // adjusted these values by scaling 1000
                "radius": 3.0
            },
			{
                "c": 0.01, 
                "offset": 2500.0, // adjusted these values by scaling 1000
                "radius": 0.9
            }                        
        ]
    }, 
    "Alhena": {
        "id": 31601, 
        "name": "Gamma Geminorum", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.001, 
                "offset": 0, 
                "radius": 3.3
            }
        ]
    }, 
    "Alioth": {
        "id": 62758, 
        "name": "Epsilon Ursae Majoris", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.022, 
                "offset": 0, 
                "radius": 3.7
            }
        ]
    }, 
    "Alkaid": {
        "id": 67089, 
        "name": "Eta Ursae Majoris", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.099, 
                "offset": 0, 
                "radius": 3.4
            }
        ]
    }, 
    "Alnair": {
        "id": 108923, 
        "name": "Alpha Gruis", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.07, 
                "offset": 0, 
                "radius": 3.4
            }
        ]
    }, 
    "Alnath": {
        "id": 25364, 
        "name": "Beta Tauri", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.13, 
                "offset": 0, 
                "radius": 4.2
            }
        ]
    }, 
    "Alnilam": {
        "id": 26246, 
        "name": "Alnilam", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.184, 
                "offset": 0, 
                "radius": 24
            }
        ]
    }, 
    "Alnitak": {
        "id": 26662, 
        "name": "Alnitak", 
        "sep": 50.0, // complete guess
        "sub": [
            {
                "c": -0.199, 
                "offset": 0, 
                "radius": 20
            },
            {
                "c": -0.33, 
                "offset": 0, 
                "radius": 18 // complete guess
            }
        ]
    }, 
    "Alphard": {
        "id": 46259, 
        "name": "Alphard", 
        "sep": 0, 
        "sub": [
            {
                "c": 1.44, 
                "offset": 0, 
                "radius": 50.5
            }
        ]
    }, 
    "Alphekka": {
        "id": 76036, 
        "name": "Alpha Coronae Borealis", 
        "sep": 100.0, // complete guess
        "sub": [
            {
                "c": 0.032, 
                "offset": 0, 
                "radius": 2.89
            },
			{
                "c": 0.4, 
                "offset": 0, 
                "radius": 0.9
            }            
        ]
    }, 
    "Alpheratz": {
        "id": 676, 
        "name": "Alpha Andromedae", 
        "sep": 100.0, // complete guess
        "sub": [
            {
                "c": -0.038, 
                "offset": 0, 
                "radius": 2.7
            },
			{
                "c": -0.01, 
                "offset": 0, 
                "radius": 1.65
            }            
        ]
    }, 
    "Altair": {
        "id": 97339, 
        "name": "Altair", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.221, 
                "offset": 0, 
                "radius": 1.63
            }
        ]
    }, 
    "Ankaa": {
        "id": 2076, 
        "name": "Alpha Phoenicis", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.083, 
                "offset": 0, 
                "radius": 15
            }
        ]
    }, 
    "Antares": {
        "id": 80520, 
        "name": "Antares", 
        "sep": 529.0, 
        "sub": [
            {
                "c": 1.865, 
                "offset": 0, 
                "radius": 883
            },
            {
                "c": -0.3, 
                "offset": 0, 
                "radius": 10 // complete guess
            }
        ]
    }, 
    "Arcturus": {
        "id": 69452, 
        "name": "Arcturus", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.239, 
                "offset": 0, 
                "radius": 25.7
            }
        ]
    }, 
    "Arneb": {
        "id": 25920, 
        "name": "Alpha Leporis", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.211, 
                "offset": 0, 
                "radius": 129
            }
        ]
    }, 
    "Barnards Star": {
        "id": 87666, 
        "name": "Barnard's Star", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.57, 
                "offset": 0, 
                "radius": 0.196
            }
        ]
    }, 
    "Bellatrix": {
        "id": 25273, 
        "name": "Bellatrix", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.224, 
                "offset": 0, 
                "radius": 6
            }
        ]
    }, 
    "Betelgeuse": {
        "id": 27919, 
        "name": "Betelgeuse", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.5, 
                "offset": 0, 
                "radius": 1050
            }
        ]
    }, 
    "Canopus": {
        "id": 30365, 
        "name": "Canopus", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.164, 
                "offset": 0, 
                "radius": 65
            }
        ]
    }, 
    "Capella": {
        "id": 24549, 
        "name": "Capella", 
        "sep": 100.0, // complete guess
        "sub": [
            {
                "c": 0.795, 
                "offset": 0, 
                "radius": 12.2
            },
            {
                "c": 0.6, 
                "offset": 0, 
                "radius": 9.2
            }
        ]
    }, 
    "Caph": {
        "id": 744, 
        "name": "Beta Cassiopeiae", 
        "sep": 50.0, 
        "sub": [
            {
                "c": 0.38, 
                "offset": 0, 
                "radius": 3.5
            },
            {
                "c": 0.15, 
                "offset": 0, 
                "radius": 1.5 // complete guess
            }
        ]
    }, 
    "Castor": {
        "id": 36744, 
        "name": "Castor", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.034, 
                "offset": 0,
                "radius": 2.3
            },
            {
                "c": 1.1, 
                "offset": 90, // complete guess
                "radius": 2.0 // complete guess
            },
            {
                "c": -0.02, 
                "offset": 20, // complete guess
                "radius": 1.6
            },
            {
                "c": 1.2, 
                "offset": 50, // complete guess
                "radius": 1.9 // complete guess
            },
            {
                "c": 1.4, 
                "offset": 40, // complete guess
                "radius": 0.76 
            },
            {
                "c": 1.4, 
                "offset": 30, // complete guess
                "radius": 0.68 // complete guess
            }                                   
        ]
    }, 
    "Deneb": {
        "id": 101768, 
        "name": "Deneb", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.092, 
                "offset": 0, 
                "radius": 203
            }
        ]
    }, 
    "Denebola": {
        "id": 57460, 
        "name": "Denebola", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.09, 
                "offset": 0, 
                "radius": 1.728
            }
        ]
    }, 
    "Diphda": {
        "id": 3413, 
        "name": "Beta Ceti", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.019, 
                "offset": 0, 
                "radius": 16.78
            }
        ]
    }, 
    "Dubhe": {
        "id": 53905, 
        "name": "Alpha Ursae Majoris", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.061, 
                "offset": 0, 
                "radius": 30
            }
        ]
    }, 
    "Enif": {
        "id": 106973, 
        "name": "Epsilon Pegasi", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.52, 
                "offset": 0, 
                "radius": 185
            }
        ]
    }, 
    "Etamin": {
        "id": 87562, 
        "name": "Gamma Draconis", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.521, 
                "offset": 0, 
                "radius": 48.15
            }
        ]
    }, 
    "Fomalhaut": {
        "id": 113009, 
        "name": "Fomalhaut", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.145, 
                "offset": 0, 
                "radius": 1.842
            }
        ]
    }, 
    "Groombridge 1618": {
        "id": 49767, 
        "name": "Groombridge 1618", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.326, 
                "offset": 0, 
                "radius": 0.605
            }
        ]
    }, 
    "Groombridge 1830": {
        "id": 57768, 
        "name": "Groombridge 1830", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.754, 
                "offset": 0, 
                "radius": 0.681
            }
        ]
    }, 
    "Hadar": {
        "id": 68484, 
        "name": "Beta Centauri", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.231, 
                "offset": 0, 
                "radius": 8
            }
        ]
    }, 
    "Hamal": {
        "id": 9861, 
        "name": "Alpha Arietis", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.151, 
                "offset": 0, 
                "radius": 14.9
            }
        ]
    }, 
    "Izar": {
        "id": 71880, 
        "name": "Epsilon Boötis", 
        "sep": 50.0, // complete guess
        "sub": [
            {
                "c": 0.966, 
                "offset": 0, 
                "radius": 33
            },
            {
                "c": -0.05, 
                "offset": 0, 
                "radius": 8 // complete guess
            }            
        ]
    }, 
    "Kapteyns Star": {
        "id": 24129, 
        "name": "Kapteyn's Star", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.543, 
                "offset": 0, 
                "radius": 0.291
            }
        ]
    }, 
    "Kaus Australis": {
        "id": 89907, 
        "name": "Epsilon Sagittarii", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.031, 
                "offset": 0, 
                "radius": 6.8
            },
            {
                "c": 0.58, 
                "offset": 30, // complete guess
                "radius": 0.9
            }
        ]
    }, 
    "Kochab": {
        "id": 72381, 
        "name": "Beta Ursae Minoris", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.465, 
                "offset": 0, 
                "radius": 42.06
            }
        ]
    }, 
    "Kruger 60": {
        "id": 110548, 
        "name": "Kruger 60", 
        "sep": 9.5, 
        "sub": [
            {
                "c": 1.613, 
                "offset": 0, 
                "radius": 0.35
            },
            {
                "c": 1.8, 
                "offset": 0, 
                "radius": 0.24
            }
        ]
    }, 
    "Lacaille 8760": {
        "id": 104752, 
        "name": "Lacaille 8760", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.397, 
                "offset": 0, 
                "radius": 0.51
            }
        ]
    }, 
    "Lacaille 9352": {
        "id": 113688, 
        "name": "Lacaille 9352", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.483, 
                "offset": 0, 
                "radius": 0.459
            }
        ]
    }, 
    "Lalande 21185": {
        "id": 53879, 
        "name": "Lalande 21185", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.502, 
                "offset": 0, 
                "radius": 0.393
            }
        ]
    }, 
    "Luytens Star": {
        "id": 36107, 
        "name": "Luyten's Star", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.573, 
                "offset": 0, 
                "radius": 0.35
            }
        ]
    }, 
    "Markab": {
        "id": 113604, 
        "name": "Alpha Pegasi", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.002, 
                "offset": 0, 
                "radius": 4.72
            }
        ]
    }, 
    "Menkar": {
        "id": 14100, 
        "name": "Alpha Ceti", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.63, 
                "offset": 0, 
                "radius": 89
            }
        ]
    }, 
    "Merak": {
        "id": 53754, 
        "name": "Beta Ursae Majoris", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.033, 
                "offset": 0, 
                "radius": 3.021
            }
        ]
    }, 
    "Mirach": {
        "id": 5436, 
        "name": "Beta Andromedae", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.576, 
                "offset": 0, 
                "radius": 100
            }
        ]
    }, 
    "Mirphak": {
        "id": 15824, 
        "name": "Alpha Persei", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.481, 
                "offset": 0, 
                "radius": 31
            }
        ]
    }, 
    // Lack of detailing info on Mizar
    //	Actually a quadruple star system?
    "Mizar": {
        "id": 65174, 
        "name": "Mizar", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.057, 
                "offset": 0, 
                "radius": 1
            }
        ]
    }, 
    "Nihal": {
        "id": 25542, 
        "name": "Beta Leporis", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.807, 
                "offset": 0, 
                "radius": 16
            }
        ]
    }, 
    "Nunki": {
        "id": 92565, 
        "name": "Sigma Sagittarii", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.134, 
                "offset": 0, 
                "radius": 4.5
            }
        ]
    }, 
    "Phad": {
        "id": 57829, 
        "name": "Gamma Ursae Majoris", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.044, 
                "offset": 0, 
                "radius": 3.04
            }
        ]
    }, 
    "Polaris": {
        "id": 11734, 
        "name": "Polaris", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.636, 
                "offset": 0, 
                "radius": 46
            },
            {
                "c": 0.30, 
                "offset": 2400, 
                "radius": 1
            },
            {
                "c": 0.25, 
                "offset": 18.8, 
                "radius": 2
            }
        ]
    }, 
    "Pollux": {
        "id": 37718, 
        "name": "Pollux", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.991, 
                "offset": 0, 
                "radius": 8.8
            }
        ]
    }, 
    "Procyon": {
        "id": 37173, 
        "name": "Procyon", 
        "sep": 15.0, 
        "sub": [
            {
                "c": 0.432, 
                "offset": 0, 
                "radius": 2.048
            },
            {
                "c": 0.65, 
                "offset": 0, 
                "radius": 1.2 // complete guess
            }
        ]
    }, 
    "Proxima Centauri": {
        "id": 70667, 
        "name": "Proxima Centauri", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.807, 
                "offset": 0, 
                "radius": 0.141
            }
        ]
    }, 
    "Rasalgethi": {
        "id": 84087, 
        "name": "Alpha Herculis", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.164, 
                "offset": 0, 
                "radius": 387
            }
        ]
    }, 
    "Rasalhague": {
        "id": 85770, 
        "name": "Alpha Ophiuchi", 
        "sep": 20.0, // complete guess
        "sub": [
            {
                "c": 0.155, 
                "offset": 0, 
                "radius": 2.6
            },
            {
                "c": 0.8, 
                "offset": 0, 
                "radius": 0.8 // complete guess
            }
        ]
    }, 
    "Regulus": {
        "id": 49528, 
        "name": "Regulus", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.11, 
                "offset": 0, 
                "radius": 3.6
            },
            {
                "c": 0.87, 
                "offset": 50, 
                "radius": 0.5
            },
            {
                "c": 1.4, 
                "offset": 50, 
                "radius": 0.5
            },
            {
                "c": -0.05, // complete guess
                "offset": 120, 
                "radius": 0.2
            }
        ]
    }, 
    "Rigel": {
        "id": 24378, 
        "name": "Rigel", 
        "sep": 2200.0, 
        "sub": [
            {
                "c": -0.03, 
                "offset": 0, 
                "radius": 74
            },
            {
                "c": -0.03, 
                "offset": 0, 
                "radius": 50
            },
        ]
    }, 
    "Rigel Kentaurus A": {
        "id": 71457, 
        "name": "Alpha Centauri A", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.71, 
                "offset": 0, 
                "radius": 1.227
            }
        ]
    }, 
    "Rigel Kentaurus B": {
        "id": 71454, 
        "name": "Alpha Centauri B", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.9, 
                "offset": 0, 
                "radius": 0.865
            }
        ]
    }, 
    "Saiph": {
        "id": 27298, 
        "name": "Saiph", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.168, 
                "offset": 0, 
                "radius": 22.2
            }
        ]
    }, 
    "Scheat": {
        "id": 113522, 
        "name": "Beta Pegasi", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.655, 
                "offset": 0, 
                "radius": 95
            }
        ]
    }, 
    "Shaula": {
        "id": 85666, 
        "name": "Lambda Scorpii", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.231, 
                "offset": 0, 
                "radius": 6.5
            },
            {
                "c": -0.3, 
                "offset": 7500, 
                "radius": 0.9
            },
            {
                "c": -0.3, 
                "offset": 17000, 
                "radius": 6.0
            }
        ]
    }, 
    "Shedir": {
        "id": 3172, 
        "name": "Shedir", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.17, 
                "offset": 0, 
                "radius": 42
            }
        ]
    }, 
    "Sirius": {
        "id": 32263, 
        "name": "Sirius", 
        "sep": 80.0,     //  complete guess
        "sub": [
            {
                "c": 0.009, 
                "offset": 0, 
                "radius": 1.711
            },
            {
                "c": -0.03, 
                "offset": 0, 
                "radius": 0.0084
            }
        ]
    }, 
    "Sol": {
        "id": 0, 
        "name": "Sun", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.656, 
                "offset": 0, 
                "radius": 1
            }
        ]
    }, 
    "Spica": {
        "id": 65270, 
        "name": "Spica", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.235, 
                "offset": 0, 
                "radius": 7.40
            }
        ]
    }, 
    "Tarazed": {
        "id": 96971, 
        "name": "Gamma Aquilae", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.507, 
                "offset": 0, 
                "radius": 95
            }
        ]
    }, 
    "Unukalhai": {
        "id": 76836, 
        "name": "Alpha Serpentis", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 1.167, 
                "offset": 0, 
                "radius": 12
            }
        ]
    }, 
    "Van Maanens Star": {
        "id": 3820, 
        "name": "Van Maanen's Star", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.554, 
                "offset": 0, 
                "radius": 0.013
            }
        ]
    }, 
    "Vega": {
        "id": 90980, 
        "name": "Vega", 
        "sep": 0.0, 
        "sub": [
            {
                "c": -0.001, 
                "offset": 0, 
                "radius": 2.5
            }
        ]
    }, 
    "Vindemiatrix": {
        "id": 63406, 
        "name": "Epsilon Virginis", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.934, 
                "offset": 0, 
                "radius": 10.6
            }
        ]
    }, 
    "p Eridani": {
        "id": 7736, 
        "name": "p Eridani", 
        "sep": 0.0, 
        "sub": [
            {
                "c": 0.88, 
                "offset": 0, 
                "radius": 10.6
            }
        ]
    }
}