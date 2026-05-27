const INDIAN_LOCATIONS = [
  {
    state: "Delhi",
    cities: [
      {
        name: "New Delhi",
        lat: 28.6139,
        lng: 77.2090,
        railwayStations: [
          { name: "New Delhi Railway Station", code: "NDLS" },
          { name: "Delhi Junction", code: "DLI" },
          { name: "Hazrat Nizamuddin", code: "NZM" },
          { name: "Anand Vihar Terminal", code: "ANVT" }
        ],
        busStands: [
          { name: "Kashmere Gate ISBT" },
          { name: "Anand Vihar ISBT" },
          { name: "Sarai Kale Khan ISBT" }
        ]
      }
    ]
  },
  {
    state: "Maharashtra",
    cities: [
      {
        name: "Mumbai",
        lat: 19.0760,
        lng: 72.8777,
        railwayStations: [
          { name: "Chhatrapati Shivaji Maharaj Terminus", code: "CSMT" },
          { name: "Mumbai Central", code: "MMCT" },
          { name: "Lokmanya Tilak Terminus", code: "LTT" },
          { name: "Dadar Railway Station", code: "DR" }
        ],
        busStands: [
          { name: "Mumbai Central MSRTC Stand" },
          { name: "Dadar MSRTC Stand" },
          { name: "Borivali Nancy Colony Stand" }
        ]
      },
      {
        name: "Pune",
        lat: 18.5204,
        lng: 73.8567,
        railwayStations: [
          { name: "Pune Junction", code: "PUNE" },
          { name: "Shivajinagar", code: "SVJR" }
        ],
        busStands: [
          { name: "Swargate Bus Stand" },
          { name: "Pune Station MSRTC Stand" }
        ]
      }
    ]
  },
  {
    state: "Karnataka",
    cities: [
      {
        name: "Bengaluru",
        lat: 12.9716,
        lng: 77.5946,
        railwayStations: [
          { name: "KSR Bengaluru City", code: "SBC" },
          { name: "Yesvantpur Junction", code: "YPR" },
          { name: "Bangalore Cantt", code: "BNC" }
        ],
        busStands: [
          { name: "Majestic Bus Station (Kempegowda)" },
          { name: "Satellite Bus Station (Mysore Road)" },
          { name: "Shantinagar Bus Station" }
        ]
      }
    ]
  },
  {
    state: "Tamil Nadu",
    cities: [
      {
        name: "Chennai",
        lat: 13.0827,
        lng: 80.2707,
        railwayStations: [
          { name: "MGR Chennai Central", code: "MAS" },
          { name: "Chennai Egmore", code: "MS" },
          { name: "Tambaram Railway Station", code: "TBM" }
        ],
        busStands: [
          { name: "Chennai Koyambedu CMBT" },
          { name: "Kilambakkam Bus Terminus" }
        ]
      }
    ]
  },
  {
    state: "West Bengal",
    cities: [
      {
        name: "Kolkata",
        lat: 22.5726,
        lng: 88.3639,
        railwayStations: [
          { name: "Howrah Junction", code: "HWH" },
          { name: "Sealdah Railway Station", code: "SDAH" },
          { name: "Shalimar Railway Station", code: "SHM" },
          { name: "Kolkata Railway Station", code: "KOAA" }
        ],
        busStands: [
          { name: "Esplanade Bus Terminus" },
          { name: "Karunamoyee Bus Terminus" },
          { name: "Babughat Bus Stand" }
        ]
      }
    ]
  },
  {
    state: "Uttar Pradesh",
    cities: [
      {
        name: "Lucknow",
        lat: 26.8467,
        lng: 80.9462,
        railwayStations: [
          { name: "Lucknow Charbagh", code: "LKO" },
          { name: "Lucknow Junction", code: "LJN" }
        ],
        busStands: [
          { name: "Kaiserbagh Bus Stand" },
          { name: "Alambagh ISBT" }
        ]
      },
      {
        name: "Kanpur",
        lat: 26.4499,
        lng: 80.3319,
        railwayStations: [
          { name: "Kanpur Central", code: "CNB" }
        ],
        busStands: [
          { name: "Jhakarkati Bus Stand" }
        ]
      },
      {
        name: "Varanasi",
        lat: 25.3176,
        lng: 82.9739,
        railwayStations: [
          { name: "Varanasi Junction", code: "BSB" },
          { name: "Pt. Deen Dayal Upadhyaya Jn", code: "DDU" }
        ],
        busStands: [
          { name: "Chaudhary Charan Singh Bus Stand" }
        ]
      }
    ]
  },
  {
    state: "Gujarat",
    cities: [
      {
        name: "Ahmedabad",
        lat: 23.0225,
        lng: 72.5714,
        railwayStations: [
          { name: "Ahmedabad Junction", code: "ADI" },
          { name: "Sabarmati Junction", code: "SBT" }
        ],
        busStands: [
          { name: "Geeta Mandir Bus Stand" }
        ]
      }
    ]
  },
  {
    state: "Rajasthan",
    cities: [
      {
        name: "Jaipur",
        lat: 26.9124,
        lng: 75.7873,
        railwayStations: [
          { name: "Jaipur Junction", code: "JP" },
          { name: "Gandhinagar Jaipur", code: "GADJ" }
        ],
        busStands: [
          { name: "Sindhi Camp Bus Stand" }
        ]
      }
    ]
  },
  {
    state: "Himachal Pradesh",
    cities: [
      {
        name: "Shimla",
        lat: 31.1048,
        lng: 77.1734,
        railwayStations: [
          { name: "Shimla Railway Station", code: "SML" },
          { name: "Summer Hill", code: "SHM" }
        ],
        busStands: [
          { name: "Shimla ISBT Tutikandi" }
        ]
      },
      {
        name: "Solan",
        lat: 30.9084,
        lng: 77.0982,
        railwayStations: [
          { name: "Solan Railway Station", code: "SOLN" }
        ],
        busStands: [
          { name: "Solan Bus Stand" }
        ]
      },
      {
        name: "Manali",
        lat: 32.2396,
        lng: 77.1887,
        railwayStations: [
          { name: "Joginder Nagar (Nearest Rail)", code: "JDNX" }
        ],
        busStands: [
          { name: "Manali ISBT" }
        ]
      },
      {
        name: "Dharamshala",
        lat: 32.2190,
        lng: 76.3234,
        railwayStations: [
          { name: "Kangra (Nearest Rail)", code: "KGRA" }
        ],
        busStands: [
          { name: "Dharamshala ISBT" }
        ]
      }
    ]
  },
  {
    state: "Haryana",
    cities: [
      {
        name: "Kalka",
        lat: 30.8333,
        lng: 76.9333,
        railwayStations: [
          { name: "Kalka Railway Station", code: "KLK" }
        ],
        busStands: [
          { name: "Kalka Bus Stand" }
        ]
      },
      {
        name: "Gurugram",
        lat: 28.4595,
        lng: 77.0266,
        railwayStations: [
          { name: "Gurgaon Railway Station", code: "GGN" }
        ],
        busStands: [
          { name: "Gurugram ISBT" }
        ]
      },
      {
        name: "Ambala",
        lat: 30.3782,
        lng: 76.7767,
        railwayStations: [
          { name: "Ambala Cantt Junction", code: "UMB" }
        ],
        busStands: [
          { name: "Ambala Cantt Bus Stand" }
        ]
      }
    ]
  },
  {
    state: "Chandigarh",
    cities: [
      {
        name: "Chandigarh",
        lat: 30.7333,
        lng: 76.7794,
        railwayStations: [
          { name: "Chandigarh Junction", code: "CDG" }
        ],
        busStands: [
          { name: "Chandigarh ISBT Sector 43" },
          { name: "Chandigarh ISBT Sector 17" }
        ]
      }
    ]
  },
  {
    state: "Punjab",
    cities: [
      {
        name: "Amritsar",
        lat: 31.6340,
        lng: 74.8723,
        railwayStations: [
          { name: "Amritsar Junction", code: "ASR" }
        ],
        busStands: [
          { name: "Amritsar ISBT" }
        ]
      }
    ]
  },
  {
    state: "Uttarakhand",
    cities: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322,
        railwayStations: [
          { name: "Dehradun Railway Station", code: "DDN" }
        ],
        busStands: [
          { name: "Dehradun ISBT" }
        ]
      },
      {
        name: "Haridwar",
        lat: 29.9457,
        lng: 78.1642,
        railwayStations: [
          { name: "Haridwar Railway Station", code: "HW" }
        ],
        busStands: [
          { name: "Haridwar Bus Stand" }
        ]
      }
    ]
  },
  {
    state: "Bihar",
    cities: [
      {
        name: "Patna",
        lat: 25.5941,
        lng: 85.1376,
        railwayStations: [
          { name: "Patna Junction", code: "PNBE" },
          { name: "Rajendra Nagar Terminal", code: "RJPB" }
        ],
        busStands: [
          { name: "Patna Bankipur Bus Stand" },
          { name: "Patliputra Bus Terminal" }
        ]
      }
    ]
  },
  {
    state: "Madhya Pradesh",
    cities: [
      {
        name: "Bhopal",
        lat: 23.2599,
        lng: 77.4126,
        railwayStations: [
          { name: "Bhopal Junction", code: "BPL" },
          { name: "Rani Kamalapati", code: "RKMP" }
        ],
        busStands: [
          { name: "Kushabhau Thakre ISBT" }
        ]
      }
    ]
  },
  {
    state: "Telangana",
    cities: [
      {
        name: "Hyderabad",
        lat: 17.3850,
        lng: 78.4867,
        railwayStations: [
          { name: "Secunderabad Junction", code: "SC" },
          { name: "Hyderabad Deccan", code: "HYB" },
          { name: "Kacheguda", code: "KCG" }
        ],
        busStands: [
          { name: "Mahatma Gandhi Bus Station (MGBS)" },
          { name: "Jubilee Bus Station (JBS)" }
        ]
      }
    ]
  },
  {
    state: "Andhra Pradesh",
    cities: [
      {
        name: "Vijayawada",
        lat: 16.5062,
        lng: 80.6480,
        railwayStations: [
          { name: "Vijayawada Junction", code: "BZA" }
        ],
        busStands: [
          { name: "Pandit Nehru Bus Station (PNBS)" }
        ]
      }
    ]
  },
  {
    state: "Kerala",
    cities: [
      {
        name: "Thiruvananthapuram",
        lat: 8.5241,
        lng: 76.9366,
        railwayStations: [
          { name: "Trivandrum Central", code: "TVC" }
        ],
        busStands: [
          { name: "Thampanoor Central Bus Station" }
        ]
      }
    ]
  },
  {
    state: "Odisha",
    cities: [
      {
        name: "Bhubaneswar",
        lat: 20.2961,
        lng: 85.8245,
        railwayStations: [
          { name: "Bhubaneswar Railway Station", code: "BBS" }
        ],
        busStands: [
          { name: "Baramunda ISBT" }
        ]
      }
    ]
  },
  {
    state: "Assam",
    cities: [
      {
        name: "Guwahati",
        lat: 26.1445,
        lng: 91.7362,
        railwayStations: [
          { name: "Guwahati Railway Station", code: "GHY" }
        ],
        busStands: [
          { name: "Guwahati ISBT" }
        ]
      }
    ]
  },
  {
    state: "Jammu & Kashmir",
    cities: [
      {
        name: "Jammu",
        lat: 32.7266,
        lng: 74.8570,
        railwayStations: [
          { name: "Jammu Tawi", code: "JAT" }
        ],
        busStands: [
          { name: "Jammu ISBT" }
        ]
      }
    ]
  }
];

module.exports = { INDIAN_LOCATIONS };
