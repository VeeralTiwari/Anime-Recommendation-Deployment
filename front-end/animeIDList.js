
// const mixedArray = [
//     // From actionAnimeIds
//     5114, 2, 16498, 57, 64, 55, 19815, 21, 9989, 23,
//     4181, 29, 30276, 34599, 25, 164, 22, 40028, 1535, 22319,
  
//     // From adventureAnimeIds
//     215, 248, 180, 189, 239, 261, 236, 164, 193, 210,
//     5114, 222, 176, 231, 20, 174, 204, 212, 251, 232,
   
//     // From dramaAnimeIds
//     4181, 16498, 5114, 1535, 2391, 2405, 2407, 2363, 2367, 2414,
//     2381, 2399, 2419, 2369, 2417, 2390, 2423, 2424, 2389, 2397,
  
//     // From romanceAnimeIds
//     1535, 20, 22, 4181, 30276, 16498, 3023, 3006, 3055, 3000,
//     3011, 3002, 3042, 3044, 3018, 3038, 3007, 3025, 3016, 3057,
  
//     // From fantasyAnimeIds
//     5114, 1535, 4181, 30276, 9253, 2519, 2524, 2503, 2531, 2501,
//     2520, 2526, 2500, 2536, 2525, 2538, 2512, 2540, 2510, 2543,
  
//     // From sliceOfLifeAnimeIds
//     3133, 400, 16635, 22535, 13759, 12345, 11061, 265, 2327, 31646,
//     13203, 31964, 21763, 32995, 27711, 9253, 32901, 21619, 16782, 12403,
  
//     // From comedyAnimeIds
//     20, 9253, 918, 527, 1535, 5114, 3091, 32995, 28891, 5028,
//     16706, 2903, 14813, 23273, 16635, 21, 5029, 226, 16498, 22319,
  
//     // From mysteryAnimeIds
//     16498, 861, 34437, 32995, 3783, 4081, 13759, 30276, 9253, 22,
//     11061, 4181, 5028, 31149, 164, 32281, 22319, 2903, 1535, 5114
//   ];
  const homePage = [
    5114, 9253, 15335, 28977, 31964, 11061, 19815, 9252, 32935, 16498,
    199, 15417, 12355, 263, 6547, 4877, 4181, 26243, 32281, 2001,
    37779, 1535, 28851, 4654, 31240, 30694, 2904, 10165, 36456, 1575,
    9253, 28851, 457, 24833, 1, 7311, 16782, 3927, 32935, 17074,
    19, 34591, 6702, 39247, 44042, 1604, 32182, 35839, 6702, 30276,
    4224, 20583, 24701, 32902, 6594, 2167, 2127, 5114, 9253, 15335,
    21329, 7311, 20583, 24701, 32902, 6594, 2167, 2127, 4224, 6702,
    32282, 36456, 199, 37095, 37987, 44042, 32281, 44042, 28851, 21855,
    16894, 37095, 37987, 23273, 37779, 37095, 44042, 918, 4898, 25157,
    28851, 2787, 24701, 35839, 21329, 16498, 37187, 22789, 32282, 12355
  ];



const dummy = [  
    [16498, 205, 48583, 20785, 11741, 57864, 18153, 35073, 35849, 14513, 3588, 10793, 38000, 20507, 121, 51039, 17265, 15583, 26055, 38524, 41587, 52991, 56524, 21881, 22535, 34134, 30503, 22043, 36474, 51009, 39551, 14719, 6880, 44511, 40748, 18679, 269, 37520, 11061, 9253, 1575, 918, 2904, 30276, 34572, 30, 32182, 164, 55791, 36511, 6746, 42249, 13601, 26243, 4898, 38408, 40221, 37521, 20, 35760, 9919, 31933, 20899, 1735, 31964, 22199, 37349, 5114, 29803, 35790, 11757, 813, 37510, 30296, 33486, 47778, 24833, 10620, 34577, 28977, 37991, 31478, 27899, 22297, 48561, 25777, 22319, 226, 30654, 28121, 38671, 2001, 35120, 50265, 1, 223, 11617, 889, 37430, 6702, 21, 23755, 10087, 8074, 36456, 40456, 40028], 
    
    [20853, 24455, 41094, 40507, 481, 57864, 38573, 31741, 6811, 8086, 237, 36862, 14833, 40594, 51039, 28755, 11319, 39523, 50175, 597, 202, 52701, 2418, 38524, 52991, 56524, 22101, 53393, 52347, 34497, 35839, 34626, 12477, 39792, 40357, 41899, 14349, 9253, 50612, 36028, 3712, 48549, 47160, 1292, 572, 39292, 40056, 55791, 6033, 12413, 40571, 12859, 5341, 49458, 53580, 232, 44203, 16524, 513, 2472, 154, 49891, 5530, 48760, 28805, 30911, 21939, 5114, 35946, 53998, 41491, 35838, 49709, 268, 39198, 39575, 21843, 41380, 43523, 48661, 13667, 37984, 55644, 48895, 486, 28977, 37744, 47164, 235, 1840, 32887, 50594, 28249, 68, 52830, 31764, 39576, 55888, 36946, 48761, 430, 552, 34176, 21, 44037, 32379, 1686, 35972, 442, 41084],
     
    [440, 31, 145, 14397, 38816, 6351, 2581, 32902, 134, 239, 37451, 10218, 44, 3783, 50416, 15227, 57864, 34712, 13655, 31553, 1690, 25283, 36220, 1530, 10721, 37972, 51552, 51039, 18, 3092, 597, 12175, 174, 4059, 1033, 4722, 36027, 38524, 52991, 56524, 35928, 10568, 39539, 8142, 16, 30187, 6747, 11979, 28735, 52198, 37208, 9253, 32438, 6773, 759, 4282, 34055, 40421, 33743, 55791, 31405, 67, 37965, 376, 21557, 416, 36266, 12113, 2129, 38414, 1222, 6211, 329, 11977, 35608, 16001, 15039, 31988, 41930, 322, 186, 26, 543, 12115, 5114, 41694, 79, 64, 387, 49709, 39575, 16009, 41380, 433, 7193, 28977, 54918, 267, 31251, 35079, 38594, 18245, 33095, 14353, 16201, 21, 2924, 101, 29093], 
     
    [11887, 20785, 356, 249, 23233, 42897, 57864, 13759, 14813, 35849, 3457, 27787, 4224, 25157, 51039, 37450, 33487, 15583, 30307, 11499, 32949, 38524, 24703, 52991, 48736, 56524, 21881, 39547, 16870, 18897, 38826, 7674, 38101, 39783, 17895, 21995, 31798, 17729, 6347, 9253, 877, 34280, 14741, 35203, 2966, 23277, 2476, 55791, 30544, 23847, 7593, 30015, 1195, 35968, 10719, 28297, 16782, 8525, 14227, 25013, 15451, 16067, 1689, 41389, 35062, 6045, 18671, 50346, 5114, 11759, 2167, 11757, 30123, 14289, 2034, 2236, 30296, 32901, 431, 7054, 40839, 10408, 23273, 33674, 28677, 28977, 9041, 5081, 1210, 4181, 17074, 36407, 14713, 226, 2993, 23289, 38680, 27775, 43608, 11617, 36098, 38329, 32729, 21, 19163, 3455, 40938, 853, 37982, 34902], 
     [40010, 23233, 31765, 1818, 38040, 355, 57864, 28927, 136, 27631, 31741, 34281, 36862, 14833, 6213, 41467, 51039, 14075, 18277, 28755, 30307, 39597, 39196, 48580, 5958, 527, 14467, 46569, 52991, 38524, 25397, 56524, 33489, 38668, 31339, 34497, 48556, 39247, 16870, 2890, 52299, 39701, 9253, 40834, 38555, 35203, 47790, 31637, 28497, 48413, 35557, 55791, 30544, 40750, 5341, 512, 225, 8937, 52211, 1943, 513, 16067, 41487, 32951, 36882, 48316, 7088, 34561, 16011, 33506, 5114, 40956, 8841, 30123, 40356, 23321, 51179, 43523, 31722, 11633, 392, 13125, 48895, 40540, 28977, 43299, 6707, 1482, 1840, 37987, 38790, 22147, 32105, 34662, 31442, 33, 36407, 14713, 25537, 2993, 49926, 55701, 40454, 38659, 31859, 21, 37210, 19163, 35972, 15315], 
     [15775, 34798, 31537, 32526, 40685, 38924, 32983, 30127, 57864, 32673, 21405, 35828, 38759, 21273, 33206, 49109, 34392, 12815, 51039, 21329, 34213, 34012, 34591, 24701, 38524, 52991, 56524, 35198, 24997, 477, 28957, 32607, 39247, 35241, 54968, 14355, 35145, 38474, 38476, 48779, 9253, 10460, 32175, 5300, 31771, 21681, 49909, 1004, 17082, 16417, 55791, 51462, 35222, 37033, 10162, 49776, 39808, 457, 24687, 48542, 6574, 22789, 39388, 33948, 2963, 488, 10379, 35756, 21939, 5114, 32491, 16732, 11739, 35838, 17549, 11665, 12189, 51680, 48804, 6802, 240, 48553, 32828, 23623, 28977, 19111, 7465, 38145, 35363, 24765, 34973, 21647, 5671, 3167, 34494, 35078, 29787, 3297, 20931, 32093, 13469, 4081, 31376, 21, 15051, 34525, 41312, 13333, 12355, 39324], 
     [39017, 48849, 11597, 861, 41120, 57864, 40046, 37779, 339, 54492, 40908, 32827, 36862, 3457, 32867, 51039, 38656, 34599, 14075, 20787, 202, 48580, 5630, 14467, 38524, 52991, 56524, 7311, 4752, 53393, 31758, 11111, 19, 9253, 27831, 31580, 47790, 28497, 2025, 32189, 323, 35557, 23281, 9260, 40911, 31043, 23283, 55791, 39463, 46471, 6746, 467, 2593, 2251, 7724, 13601, 1943, 4382, 8425, 4898, 35247, 38003, 40221, 457, 37086, 43, 33028, 23199, 31757, 27833, 5530, 10490, 1889, 5114, 150, 7785, 22145, 35838, 934, 10161, 37984, 12189, 15037, 13125, 28677, 46102, 6573, 16592, 228, 28977, 12445, 31478, 235, 5081, 31181, 21855, 43690, 849, 17074, 24765, 44074, 21431, 2246, 47194, 40052, 21, 28025, 790, 34933, 41084], 
    [37451, 10218, 57864, 35994, 13055, 1860, 13807, 7662, 5039, 51039, 169, 270, 11499, 2130, 19383, 36027, 38524, 52991, 56524, 38668, 22535, 30458, 617, 6880, 34103, 33253, 3652, 11111, 11837, 9253, 52505, 31580, 32189, 32438, 1571, 37517, 22687, 34544, 34055, 19315, 55791, 36511, 586, 41006, 376, 7724, 4581, 36266, 31297, 12113, 48488, 384, 11077, 2404, 32071, 40333, 33028, 31430, 37799, 10490, 14189, 1889, 543, 12115, 732, 48483, 5114, 150, 4896, 1594, 5034, 28623, 934, 11701, 36245, 437, 777, 15037, 369, 13125, 228, 28977, 16592, 12445, 27899, 36124, 3713, 47, 1281, 3342, 16694, 43690, 6610, 24765, 33, 22319, 58, 226, 10681, 2246, 35120, 54112, 1462, 34152, 405, 21, 10418, 32379, 395, 8074], [71, 40497, 33502, 20785, 5, 42310, 38691, 57864, 27631, 40046, 37779, 339, 237, 35849, 36862, 10793, 9969, 6213, 51039, 38656, 34599, 40852, 22729, 48569, 31737, 15583, 21603, 2759, 20787, 5630, 5958, 10863, 39617, 11577, 38524, 52991, 56524, 7311, 22535, 5681, 53393, 48556, 227, 6880, 6675, 3784, 31798, 9253, 1575, 918, 2025, 48549, 2904, 23281, 30, 11433, 41457, 55791, 30544, 467, 36633, 8937, 13601, 1943, 4382, 384, 16049, 513, 34542, 4654, 43, 24405, 46095, 30484, 5114, 11759, 40956, 32, 18247, 14345, 10161, 2236, 52588, 13125, 28977, 6573, 9041, 47, 3786, 36563, 849, 13663, 38671, 2001, 1, 27775, 32729, 3785, 41433, 21, 31338, 41456, 19163, 3455, 6, 59, 790, 41084], [41168, 39017, 11887, 356, 11597, 11741, 57864, 8795, 1535, 339, 11013, 42938, 3457, 28701, 32867, 51039, 37450, 33731, 270, 21603, 26055, 11499, 38524, 52991, 56524, 7311, 9989, 31758, 14719, 6880, 6547, 11111, 33255, 199, 9253, 37976, 27831, 31580, 15689, 323, 39534, 40417, 9260, 32182, 31043, 55791, 39463, 6746, 2251, 42249, 7724, 2593, 12549, 41025, 28223, 8525, 35247, 38003, 457, 15225, 31933, 20899, 23199, 120, 31757, 523, 34612, 1889, 48483, 50346, 5114, 2167, 934, 37510, 48661, 52034, 777, 10408, 28677, 25159, 10620, 28977, 37991, 31478, 12445, 47, 5081, 22297, 31181, 4181, 21855, 24765, 17074, 34662, 50172, 25537, 226, 38680, 35120, 54112, 36296, 32281, 47194, 38329, 9513, 21, 4081, 28025, 10087, 8074], [16498, 48583, 57864, 35994, 1535, 40046, 37779, 339, 32827, 3002, 51039, 38656, 14075, 2759, 5630, 39617, 38524, 52991, 56524, 22535, 227, 6880, 51535, 19, 3784, 11981, 31240, 17729, 9253, 32189, 323, 23281, 30, 37517, 40911, 31043, 23283, 55791, 36511, 2593, 21557, 7724, 10163, 13601, 1943, 41619, 42203, 28223, 384, 32998, 37086, 34542, 35760, 43, 33028, 51096, 37799, 46095, 1889, 30484, 5114, 7785, 32, 28623, 14345, 934, 39198, 437, 13125, 40935, 10620, 39587, 16592, 46102, 29095, 228, 18397, 28977, 27899, 43299, 1210, 3786, 43690, 16762, 25777, 24765, 44074, 22319, 44961, 226, 50273, 5682, 36649, 39195, 2246, 54112, 6114, 47194, 9756, 3785, 41433, 21, 51180, 790, 34933, 8074, 35507, 40028], [30694, 30831, 205, 11597, 38691, 38040, 1887, 57864, 11843, 14813, 3588, 27787, 32542, 25157, 51039, 10165, 40852, 33487, 30307, 40591, 527, 38524, 24703, 52991, 56524, 33489, 34134, 39547, 227, 39551, 18897, 18679, 33255, 38101, 39783, 48926, 6347, 9253, 34280, 14741, 918, 30276, 34572, 23277, 37141, 16742, 32182, 55791, 30544, 23847, 225, 1195, 35968, 10719, 28297, 8525, 14227, 50602, 15451, 41487, 41389, 7791, 8769, 37105, 48316, 34612, 18671, 28825, 5114, 29786, 19815, 5680, 8841, 813, 37510, 32901, 245, 11633, 7054, 40839, 37999, 28677, 24833, 28977, 9041, 1210, 15809, 849, 17074, 22147, 14713, 50172, 853, 2993, 30654, 32937, 23289, 50265, 223, 43608, 34618, 11617, 30240, 38659, 37430, 21, 3455, 42361, 34902], [35382, 14397, 288, 287, 5028, 57864, 11771, 50185, 19151, 30415, 170, 31783, 627, 37972, 2402, 27663, 51039, 10800, 34636, 35110, 54865, 37379, 10572, 18507, 31051, 7661, 37259, 265, 38883, 38524, 52991, 56524, 28891, 35249, 42940, 22, 49596, 32494, 42923, 16894, 31559, 5258, 9253, 35111, 5231, 22135, 42395, 39555, 40679, 22265, 43756, 2986, 55791, 29755, 18689, 37963, 8074, 35507, 40028], [30694, 30831, 205, 11597, 38691, 38040, 1887, 57864, 11843, 14813, 3588, 27787, 32542, 25157, 51039, 10165, 40852, 33487, 30307, 40591, 527, 38524, 24703, 52991, 56524, 33489, 34134, 39547, 227, 39551, 18897, 18679, 33255, 38101, 39783, 48926, 6347, 9253, 34280, 14741, 918, 30276, 34572, 23277, 37141, 16742, 32182, 55791, 30544, 23847, 225, 1195, 35968, 10719, 28297, 8525, 14227, 50602, 15451, 41487, 41389, 7791, 8769, 37105, 48316, 34612, 18671, 28825, 5114, 29786, 19815, 5680, 8841, 813, 37510, 32901, 245, 11633, 7054, 40839, 37999, 28677, 24833, 28977, 9041, 1210, 15809, 849, 17074, 22147, 14713, 50172, 853, 2993, 30654, 32937, 23289, 50265, 223, 43608, 34618, 11617, 30240, 38659, 37430, 21, 3455, 42361, 34902], [35382, 14397, 288, 287, 5028, 57864, 11771, 50185, 19151, 30415, 170, 31783, 627, 37972, 2402, 27663, 51039, 10800, 34636, 35110, 54865, 37379, 10572, 18507, 31051, 7661, 37259, 265, 38883, 38524, 52991, 56524, 28891, 35249, 42940, 22, 49596, 32494, 42923, 16894, 31559, 5258, 9253, 35111, 5231, 22135, 42395, 39555, 40679, 22265, 43756, 2986, 55791, 29755, 18689, 3796, 527, 38524, 24703, 52991, 56524, 33489, 34134, 39547, 227, 39551, 18897, 18679, 33255, 38101, 39783, 48926, 6347, 9253, 34280, 14741, 918, 30276, 34572, 23277, 37141, 16742, 32182, 55791, 30544, 23847, 225, 1195, 35968, 10719, 28297, 8525, 14227, 50602, 15451, 41487, 41389, 7791, 8769, 37105, 48316, 34612, 18671, 28825, 5114, 29786, 19815, 5680, 8841, 813, 37510, 32901, 245, 11633, 7054, 40839, 37999, 28677, 24833, 28977, 9041, 1210, 15809, 849, 17074, 22147, 14713, 50172, 853, 2993, 30654, 32937, 23289, 50265, 223, 43608, 34618, 11617, 30240, 38659, 37430, 21, 3455, 42361, 34902], [35382, 14397, 288, 287, 5028, 57864, 11771, 50185, 19151, 30415, 170, 31783, 627, 37972, 2402, 27663, 51039, 10800, 34636, 35110, 54865, 37379, 10572, 18507, 31051, 7661, 37259, 265, 38883, 38524, 52991, 56524, 28891, 35249, 42940, 22, 49596, 32494, 42923, 16894, 31559, 5258, 9253, 35111, 5231, 22135, 42395, 39555, 40679, 22265, 43756, 2986, 55791, 29755, 18689, 3796, 37141, 16742, 32182, 55791, 30544, 23847, 225, 1195, 35968, 10719, 28297, 8525, 14227, 50602, 15451, 41487, 41389, 7791, 8769, 37105, 48316, 34612, 18671, 28825, 5114, 29786, 19815, 5680, 8841, 813, 37510, 32901, 245, 11633, 7054, 40839, 37999, 28677, 24833, 28977, 9041, 1210, 15809, 849, 17074, 22147, 14713, 50172, 853, 2993, 30654, 32937, 23289, 50265, 223, 43608, 34618, 11617, 30240, 38659, 37430, 21, 3455, 42361, 34902], [35382, 14397, 288, 287, 5028, 57864, 11771, 50185, 19151, 30415, 170, 31783, 627, 37972, 2402, 27663, 51039, 10800, 34636, 35110, 54865, 37379, 10572, 18507, 31051, 7661, 37259, 265, 38883, 38524, 52991, 56524, 28891, 35249, 42940, 22, 49596, 32494, 42923, 16894, 31559, 5258, 9253, 35111, 5231, 22135, 42395, 39555, 40679, 22265, 43756, 2986, 55791, 29755, 18689, 37965, 5114, 29786, 19815, 5680, 8841, 813, 37510, 32901, 245, 11633, 7054, 40839, 37999, 28677, 24833, 28977, 9041, 1210, 15809, 849, 17074, 22147, 14713, 50172, 853, 2993, 30654, 32937, 23289, 50265, 223, 43608, 34618, 11617, 30240, 38659, 37430, 21, 3455, 42361, 34902], [35382, 14397, 288, 287, 5028, 57864, 11771, 50185, 19151, 30415, 170, 31783, 627, 37972, 2402, 27663, 51039, 10800, 34636, 35110, 54865, 37379, 10572, 18507, 31051, 7661, 37259, 265, 38883, 38524, 52991, 56524, 28891, 35249, 42940, 22, 49596, 32494, 42923, 16894, 31559, 5258, 9253, 35111, 5231, 22135, 42395, 39555, 40679, 22265, 43756, 2986, 55791, 29755, 18689, 3796, 19151, 30415, 170, 31783, 627, 37972, 2402, 27663, 51039, 10800, 34636, 35110, 54865, 37379, 10572, 18507, 31051, 7661, 37259, 265, 38883, 38524, 52991, 56524, 28891, 35249, 42940, 22, 49596, 32494, 42923, 16894, 31559, 5258, 9253, 35111, 5231, 22135, 42395, 39555, 40679, 22265, 43756, 2986, 55791, 29755, 18689, 3796, 28891, 35249, 42940, 22, 49596, 32494, 42923, 16894, 31559, 5258, 9253, 35111, 5231, 22135, 42395, 39555, 40679, 22265, 43756, 2986, 55791, 29755, 18689, 37965, 15, 19671, 25303, 30364, 31588, 28391, 36704, 551, 11697, 24277, 40729, 2159, 37007, 35983, 49052, 41783, 16916, 32935, 19647, 5040, 5941, 5114, 30205, 2116, 51318, 31658, 37403, 21185, 24415, 28977, 264, 40776, 36934, 30230, 263, 36563, 40262, 48406, 34443, 35806, 52742, 558, 5962, 390, 18179, 857, 38731, 34825, 36653, 32995, 32686, 21, 10507, 20583]
];
