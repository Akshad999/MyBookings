export const STATIC_BUS_ROUTES = [
  // ========== KALKA - SHIMLA ==========
  {
    from: "Kalka",
    to: "Shimla",
    buses: [
      {
        id: 101,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Kalka",
        to: "Shimla",
        departure: "06:00 AM",
        arrival: "11:00 AM",
        duration: "5h 0m",
        price: 300,
        seatsAvailable: 35,
        totalSeats: 50,
        rating: 4.2,
        amenities: ["Non-AC", "Luggage Space"]
      },
      {
        id: 102,
        operator: "HRTC Volvo",
        busType: "Volvo AC",
        from: "Kalka",
        to: "Shimla",
        departure: "07:30 AM",
        arrival: "12:30 PM",
        duration: "5h 0m",
        price: 680,
        seatsAvailable: 28,
        totalSeats: 40,
        rating: 4.6,
        amenities: ["AC", "WiFi", "Charging Port", "Water Bottle"]
      },
      {
        id: 103,
        operator: "HRTC",
        busType: "Semi-Deluxe",
        from: "Kalka",
        to: "Shimla",
        departure: "09:00 AM",
        arrival: "02:00 PM",
        duration: "5h 0m",
        price: 300,
        seatsAvailable: 32,
        totalSeats: 45,
        rating: 4.3,
        amenities: ["Non-AC", "Comfortable Seats"]
      }
    ]
  },
  // ========== SHIMLA - KALKA ==========
  {
    from: "Shimla",
    to: "Kalka",
    buses: [
      {
        id: 104,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Shimla",
        to: "Kalka",
        departure: "06:30 AM",
        arrival: "11:30 AM",
        duration: "5h 0m",
        price: 300,
        seatsAvailable: 38,
        totalSeats: 50,
        rating: 4.2,
        amenities: ["Non-AC", "Luggage Space"]
      },
      {
        id: 105,
        operator: "HRTC Volvo",
        busType: "Volvo AC",
        from: "Shimla",
        to: "Kalka",
        departure: "08:00 AM",
        arrival: "01:00 PM",
        duration: "5h 0m",
        price: 680,
        seatsAvailable: 25,
        totalSeats: 40,
        rating: 4.7,
        amenities: ["AC", "WiFi", "Charging Port", "Snacks"]
      }
    ]
  },
  // ========== SOLAN - KALKA ==========
  {
    from: "Solan",
    to: "Kalka",
    buses: [
      {
        id: 106,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Solan",
        to: "Kalka",
        departure: "07:00 AM",
        arrival: "09:30 AM",
        duration: "2h 30m",
        price: 260,
        seatsAvailable: 40,
        totalSeats: 50,
        rating: 4.1,
        amenities: ["Non-AC", "Luggage Space"]
      },
      {
        id: 107,
        operator: "HRTC",
        busType: "Semi-Deluxe",
        from: "Solan",
        to: "Kalka",
        departure: "10:00 AM",
        arrival: "12:30 PM",
        duration: "2h 30m",
        price: 260,
        seatsAvailable: 35,
        totalSeats: 45,
        rating: 4.3,
        amenities: ["Non-AC", "Comfortable Seats"]
      }
    ]
  },
  // ========== KALKA - SOLAN ==========
  {
    from: "Kalka",
    to: "Solan",
    buses: [
      {
        id: 108,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Kalka",
        to: "Solan",
        departure: "08:00 AM",
        arrival: "10:30 AM",
        duration: "2h 30m",
        price: 260,
        seatsAvailable: 42,
        totalSeats: 50,
        rating: 4.2,
        amenities: ["Non-AC", "Luggage Space"]
      }
    ]
  },
  // ========== KALKA - UNA ==========
  {
    from: "Kalka",
    to: "Una",
    buses: [
      {
        id: 109,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Kalka",
        to: "Una",
        departure: "06:30 AM",
        arrival: "10:00 AM",
        duration: "3h 30m",
        price: 190,
        seatsAvailable: 38,
        totalSeats: 50,
        rating: 4.0,
        amenities: ["Non-AC", "Luggage Space"]
      },
      {
        id: 110,
        operator: "HRTC",
        busType: "Semi-Deluxe",
        from: "Kalka",
        to: "Una",
        departure: "11:00 AM",
        arrival: "02:30 PM",
        duration: "3h 30m",
        price: 190,
        seatsAvailable: 32,
        totalSeats: 45,
        rating: 4.2,
        amenities: ["Non-AC", "Comfortable Seats"]
      }
    ]
  },
  // ========== UNA - KALKA ==========
  {
    from: "Una",
    to: "Kalka",
    buses: [
      {
        id: 111,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Una",
        to: "Kalka",
        departure: "07:00 AM",
        arrival: "10:30 AM",
        duration: "3h 30m",
        price: 190,
        seatsAvailable: 40,
        totalSeats: 50,
        rating: 4.1,
        amenities: ["Non-AC", "Luggage Space"]
      }
    ]
  },
  // ========== KALKA - NALAGARH ==========
  {
    from: "Kalka",
    to: "Nalagarh",
    buses: [
      {
        id: 112,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Kalka",
        to: "Nalagarh",
        departure: "07:30 AM",
        arrival: "10:00 AM",
        duration: "2h 30m",
        price: 240,
        seatsAvailable: 36,
        totalSeats: 50,
        rating: 4.1,
        amenities: ["Non-AC", "Luggage Space"]
      }
    ]
  },
  // ========== NALAGARH - KALKA ==========
  {
    from: "Nalagarh",
    to: "Kalka",
    buses: [
      {
        id: 113,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Nalagarh",
        to: "Kalka",
        departure: "08:00 AM",
        arrival: "10:30 AM",
        duration: "2h 30m",
        price: 240,
        seatsAvailable: 38,
        totalSeats: 50,
        rating: 4.0,
        amenities: ["Non-AC", "Luggage Space"]
      }
    ]
  },
  // ========== KALKA - DEHRADUN ==========
  {
    from: "Kalka",
    to: "Dehradun",
    buses: [
      {
        id: 114,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Kalka",
        to: "Dehradun",
        departure: "06:00 AM",
        arrival: "10:30 AM",
        duration: "4h 30m",
        price: 380,
        seatsAvailable: 35,
        totalSeats: 50,
        rating: 4.2,
        amenities: ["Non-AC", "Luggage Space"]
      },
      {
        id: 115,
        operator: "HRTC",
        busType: "Semi-Deluxe",
        from: "Kalka",
        to: "Dehradun",
        departure: "09:00 AM",
        arrival: "01:30 PM",
        duration: "4h 30m",
        price: 380,
        seatsAvailable: 30,
        totalSeats: 45,
        rating: 4.3,
        amenities: ["Non-AC", "Comfortable Seats"]
      }
    ]
  },
  // ========== DEHRADUN - KALKA ==========
  {
    from: "Dehradun",
    to: "Kalka",
    buses: [
      {
        id: 116,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Dehradun",
        to: "Kalka",
        departure: "07:00 AM",
        arrival: "11:30 AM",
        duration: "4h 30m",
        price: 380,
        seatsAvailable: 38,
        totalSeats: 50,
        rating: 4.2,
        amenities: ["Non-AC", "Luggage Space"]
      }
    ]
  },
  // ========== KALKA - PALAMPUR ==========
  {
    from: "Kalka",
    to: "Palampur",
    buses: [
      {
        id: 117,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Kalka",
        to: "Palampur",
        departure: "05:30 AM",
        arrival: "02:00 PM",
        duration: "8h 30m",
        price: 730,
        seatsAvailable: 30,
        totalSeats: 50,
        rating: 4.0,
        amenities: ["Non-AC", "Luggage Space"]
      },
      {
        id: 118,
        operator: "HRTC Volvo",
        busType: "Volvo AC",
        from: "Kalka",
        to: "Palampur",
        departure: "07:00 AM",
        arrival: "03:30 PM",
        duration: "8h 30m",
        price: 730,
        seatsAvailable: 25,
        totalSeats: 40,
        rating: 4.5,
        amenities: ["AC", "WiFi", "Charging Port", "Water Bottle"]
      }
    ]
  },
  // ========== PALAMPUR - KALKA ==========
  {
    from: "Palampur",
    to: "Kalka",
    buses: [
      {
        id: 119,
        operator: "HRTC",
        busType: "Ordinary",
        from: "Palampur",
        to: "Kalka",
        departure: "06:00 AM",
        arrival: "02:30 PM",
        duration: "8h 30m",
        price: 730,
        seatsAvailable: 32,
        totalSeats: 50,
        rating: 4.1,
        amenities: ["Non-AC", "Luggage Space"]
      },
      {
        id: 120,
        operator: "HRTC Volvo",
        busType: "Volvo AC",
        from: "Palampur",
        to: "Kalka",
        departure: "08:00 AM",
        arrival: "04:30 PM",
        duration: "8h 30m",
        price: 730,
        seatsAvailable: 28,
        totalSeats: 40,
        rating: 4.6,
        amenities: ["AC", "WiFi", "Charging Port", "Snacks"]
      }
    ]
  },
  // ========== SHIMLA - CHANDIGARH ==========
  {
    from: "Shimla",
    to: "Chandigarh",
    buses: [
      {
        id: "HP_VOLVO_SC1",
        operator: "HRTC Volvo",
        busType: "AC Semi-Sleeper",
        from: "Shimla",
        to: "Chandigarh",
        departure: "06:00",
        arrival: "11:00",
        duration: "5h 0m",
        price: 660,
        seatsAvailable: 15,
        totalSeats: 36,
        rating: 4.5,
        amenities: ["AC", "Charging Point", "Water Bottle", "Blanket"]
      },
      {
        id: "HP_DELUXE_SC2",
        operator: "HRTC Deluxe",
        busType: "Non-AC Seater",
        from: "Shimla",
        to: "Chandigarh",
        departure: "09:30",
        arrival: "15:00",
        duration: "5h 30m",
        price: 380,
        seatsAvailable: 24,
        totalSeats: 40,
        rating: 4.2,
        amenities: ["Charging Point", "Water Bottle"]
      },
      {
        id: "CTU_ORD_SC3",
        operator: "CTU",
        busType: "Non-AC Seater",
        from: "Shimla",
        to: "Chandigarh",
        departure: "12:00",
        arrival: "17:00",
        duration: "5h 0m",
        price: 340,
        seatsAvailable: 21,
        totalSeats: 48,
        rating: 4.0,
        amenities: ["Water Bottle"]
      }
    ]
  },
    // ========== CHANDIGARH - KALKA ==========
  {
    from: "Chandigarh",
    to: "Kalka",
    buses: [
      {
        id: 'BUS_HP_VOLVO_1',
        operator: 'HRTC Volvo',
        busType: 'AC Semi-Sleeper',
        from: "Chandigarh",
        to: "Kalka",
        departure: '09:00',
        arrival: '10:25',
        duration: '1h 25m',
        price: 260,
        seatsAvailable: 30,
        totalSeats: 40,
        rating: 4.6,
        amenities: ['AC', 'Water Bottle', 'Charging Point']
      },
      {
        id: 'BUS_HRY_ORD_1',
        operator: 'Haryana Roadways',
        busType: 'Non-AC Seater',
        from: "Chandigarh",
        to: "Kalka",
        departure: '13:00',
        arrival: '14:30',
        duration: '1h 30m',
        price: 110,
        seatsAvailable: 17,
        totalSeats: 50,
        rating: 4.2,
        amenities: ['Charging Point']
      }
    ]
  },
  // ========== KANGRA - AMRITSAR ==========
  {
    from: "Kangra",
    to: "Amritsar",
    buses: [
      {
        id: "HP_VOLVO_KA1",
        operator: "HRTC Volvo",
        busType: "AC Seater",
        from: "Kangra",
        to: "Amritsar",
        departure: "17:00",
        arrival: "22:30",
        duration: "5h 30m",
        price: 820,
        seatsAvailable: 14,
        totalSeats: 35,
        rating: 4.4,
        amenities: ["AC", "Water Bottle"]
      },
      {
        id: "PUNJAB_VOLVO_KA2",
        operator: "Punjab Roadways",
        busType: "AC Seater",
        from: "Kangra",
        to: "Amritsar",
        departure: "20:00",
        arrival: "01:15",
        duration: "5h 15m",
        price: 800,
        seatsAvailable: 19,
        totalSeats: 45,
        rating: 4.2,
        amenities: ["AC", "Water Bottle", "WiFi"]
      }
    ]
  },
  // ========== CHANDIGARH - DELHI ==========
  {
    from: "Chandigarh",
    to: "Delhi",
    buses: [
      {
        id: "CTU_VOLVO_CD1",
        operator: "CTU Volvo",
        busType: "AC Seater",
        from: "Chandigarh",
        to: "Delhi",
        departure: "06:00",
        arrival: "11:00",
        duration: "5h 0m",
        price: 1100,
        seatsAvailable: 26,
        totalSeats: 38,
        rating: 4.7,
        amenities: ["AC", "Charging Point", "Blanket"]
      },
      {
        id: "PRTC_DELHI_CD2",
        operator: "PRTC",
        busType: "Non-AC Seater",
        from: "Chandigarh",
        to: "Delhi",
        departure: "12:30",
        arrival: "18:00",
        duration: "5h 30m",
        price: 560,
        seatsAvailable: 19,
        totalSeats: 50,
        rating: 4.1,
        amenities: ["Charging Point"]
      },
      {
        id: "VOLVO_PRIVATE_CD3",
        operator: "Private Volvo",
        busType: "AC Sleeper",
        from: "Chandigarh",
        to: "Delhi",
        departure: "19:30",
        arrival: "01:30",
        duration: "6h 0m",
        price: 1200,
        seatsAvailable: 17,
        totalSeats: 34,
        rating: 4.8,
        amenities: ["AC", "Water Bottle", "WiFi", "Blanket"]
      }
    ]
  },
  // ========== DELHI - CHANDIGARH ==========
  {
    from: "Delhi",
    to: "Chandigarh",
    buses: [
      {
        id: 2,
        operator: "HRTC",
        busType: "AC Semi-Sleeper",
        from: "Delhi",
        to: "Chandigarh",
        departure: "07:00 AM",
        arrival: "11:30 AM",
        duration: "4h 30m",
        price: 750,
        seatsAvailable: 30,
        totalSeats: 45,
        rating: 4.3,
        amenities: ["AC", "Charging Port"]
      }
    ]
  },
  // ========== DELHI - MANALI ==========
  {
    from: "Delhi",
    to: "Manali",
    buses: [
      {
        id: "DELHI_TO_MANALI_V1",
        operator: "HRTC Volvo",
        busType: "AC Semi-Sleeper",
        from: "Delhi",
        to: "Manali",
        departure: "18:00",
        arrival: "07:00",
        duration: "13h 0m",
        price: 1900,
        seatsAvailable: 18,
        totalSeats: 40,
        rating: 4.6,
        amenities: ["AC", "Charging Point", "Blanket"]
      },
      {
        id: "DELHI_TO_MANALI_V2",
        operator: "Private Volvo",
        busType: "AC Seater",
        from: "Delhi",
        to: "Manali",
        departure: "20:30",
        arrival: "10:00",
        duration: "13h 30m",
        price: 2000,
        seatsAvailable: 12,
        totalSeats: 35,
        rating: 4.7,
        amenities: ["AC", "Water Bottle", "WiFi", "Snacks"]
      }
    ]
  },
  // ========== AMRITSAR - JAMMU ==========
  {
    from: "Amritsar",
    to: "Jammu",
    buses: [
      {
        id: "PUN_VOLVO_AJ1",
        operator: "Punjab Volvo",
        busType: "AC Sleeper",
        from: "Amritsar",
        to: "Jammu",
        departure: "05:00",
        arrival: "10:00",
        duration: "5h 0m",
        price: 900,
        seatsAvailable: 20,
        totalSeats: 44,
        rating: 4.5,
        amenities: ["AC", "Charging Point", "Water Bottle"]
      },
      {
        id: "JK_DELUXE_AJ2",
        operator: "JKRTC Deluxe",
        busType: "Non-AC Seater",
        from: "Amritsar",
        to: "Jammu",
        departure: "13:00",
        arrival: "18:15",
        duration: "5h 15m",
        price: 470,
        seatsAvailable: 30,
        totalSeats: 52,
        rating: 4.3,
        amenities: ["Charging Point"]
      }
    ]
  },
  // ========== DEHRADUN - DELHI ==========
  {
    from: "Dehradun",
    to: "Delhi",
    buses: [
      {
        id: "UKRTC_VOLVO_DD1",
        operator: "UKRTC Volvo",
        busType: "AC Semi-Sleeper",
        from: "Dehradun",
        to: "Delhi",
        departure: "22:00",
        arrival: "05:00",
        duration: "7h 0m",
        price: 950,
        seatsAvailable: 20,
        totalSeats: 40,
        rating: 4.4,
        amenities: ["AC", "Charging Point", "Blanket"]
      },
      {
        id: "UKRTC_DELUXE_DD2",
        operator: "UKRTC",
        busType: "Non-AC Seater",
        from: "Dehradun",
        to: "Delhi",
        departure: "09:30",
        arrival: "16:00",
        duration: "6h 30m",
        price: 420,
        seatsAvailable: 30,
        totalSeats: 48,
        rating: 4.1,
        amenities: ["Charging Point"]
      }
    ]
  },
  // ========== SOLAN - KARNAL ==========
  {
    from: "Solan",
    to: "Karnal",
    buses: [
      {
        id: "HRTC_VOLVO_SK1",
        operator: "HRTC Volvo",
        busType: "AC Seater",
        from: "Solan",
        to: "Karnal",
        departure: "08:30",
        arrival: "12:00",
        duration: "3h 30m",
        price: 470,
        seatsAvailable: 28,
        totalSeats: 44,
        rating: 4.6,
        amenities: ["AC", "Charging Point", "Blanket"]
      }
    ]
  },
  // ========== JALANDHAR - CHANDIGARH ==========
  {
    from: "Jalandhar",
    to: "Chandigarh",
    buses: [
      {
        id: "PUNJAB_JLD_CHD1",
        operator: "Punjab Roadways",
        busType: "AC Seater",
        from: "Jalandhar",
        to: "Chandigarh",
        departure: "09:00",
        arrival: "12:30",
        duration: "3h 30m",
        price: 470,
        seatsAvailable: 28,
        totalSeats: 44,
        rating: 4.5,
        amenities: ["AC", "Charging Point"]
      },
      {
        id: "CTU_JLD_CHD2",
        operator: "CTU",
        busType: "Non-AC Seater",
        from: "Jalandhar",
        to: "Chandigarh",
        departure: "15:00",
        arrival: "18:45",
        duration: "3h 45m",
        price: 370,
        seatsAvailable: 35,
        totalSeats: 52,
        rating: 4.2,
        amenities: ["Water Bottle"]
      }
    ]
  }
];
