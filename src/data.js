const DATA = [
    {
      "id": 1,
      "name": "Client A",
      "thumbnail": "/images/home-section/card.jpg",
      "slug": "clienta",
      "type": "Wedding",
      "categories": ["Pre-Wedding", "Haldi", "Mehndi", "Reception"],
      "cards": {
        "Pre-Wedding": [
          { "id": 1, "thumbnail": "/images/home-section/card2.jpg", "title": "Pre-Wedding Shoot 1" },
          { "id": 2, "thumbnail": "/images/home-section/card3.jpg", "title": "Pre-Wedding Shoot 2" }
        ],
        "Haldi": [
          { "id": 3, "thumbnail": "/images/home-section/card4.jpg", "title": "Haldi Ceremony" }
        ],
        "Mehndi": [
          { "id": 4, "thumbnail": "/images/home-section/card.jpg", "title": "Mehndi Celebration" }
        ],
        "Reception": [
          { "id": 5, "thumbnail": "/images/home-section/card2.jpg", "title": "Reception Highlights" }
        ]
      }
    },
    {
      "id": 2,
      "name": "Client B",
      "thumbnail": "/images/home-section/card4.jpg",
      "slug": "clientb",
      "type": "Birthday",
      "categories": ["Portraits", "Videos", "Moments"],
      "cards": {
        "Portraits": [
          { "id": 1, "thumbnail": "/images/home-section/card3.jpg", "title": "Birthday Portrait 1" }
        ],
        "Videos": [
          { "id": 2, "thumbnail": "/images/home-section/card2.jpg", "title": "Birthday Video 1" }
        ],
        "Moments": [
          { "id": 3, "thumbnail": "/images/home-section/card4.jpg", "title": "Candid Moments" }
        ]
      }
    },
    {
      "id": 3,
      "name": "Client C",
      "thumbnail": "/images/home-section/card2.jpg",
      "slug": "clientc",
      "type": "Portraits",
      "categories": ["Studio", "Outdoor", "Candid"],
      "cards": {
        "Studio": [
          { "id": 1, "thumbnail": "/images/home-section/card3.jpg", "title": "Studio Portrait 1" },
          { "id": 2, "thumbnail": "/images/home-section/card4.jpg", "title": "Studio Portrait 2" }
        ],
        "Outdoor": [
          { "id": 3, "thumbnail": "/images/home-section/card2.jpg", "title": "Outdoor Portrait 1" }
        ],
        "Candid": [
          { "id": 4, "thumbnail": "/images/home-section/card.jpg", "title": "Candid Portrait 1" }
        ]
      }
    },
    {
      "id": 4,
      "name": "Client D",
      "thumbnail": "/images/home-section/card3.jpg",
      "slug": "clientd",
      "type": "Event",
      "categories": ["Corporate", "Cultural", "Festive"],
      "cards": {
        "Corporate": [
          { "id": 1, "thumbnail": "/images/home-section/card4.jpg", "title": "Corporate Event 1" }
        ],
        "Cultural": [
          { "id": 2, "thumbnail": "/images/home-section/card.jpg", "title": "Cultural Event 1" }
        ],
        "Festive": [
          { "id": 3, "thumbnail": "/images/home-section/card2.jpg", "title": "Festive Celebration 1" }
        ]
      }
    },
    {
      "id": 5,
      "name": "Client E",
      "thumbnail": "/images/home-section/card2.jpg",
      "slug": "cliente",
      "type": "Wedding",
      "categories": ["Pre-Wedding", "Sangeet", "Wedding Day"],
      "cards": {
        "Pre-Wedding": [
          { "id": 1, "thumbnail": "/images/home-section/card3.jpg", "title": "Pre-Wedding Shoot 3" }
        ],
        "Sangeet": [
          { "id": 2, "thumbnail": "/images/home-section/card4.jpg", "title": "Sangeet Night" }
        ],
        "Wedding Day": [
          { "id": 3, "thumbnail": "/images/home-section/card.jpg", "title": "Wedding Day Moments" }
        ]
      }
    },
    {
      "id": 6,
      "name": "Client F",
      "thumbnail": "/images/home-section/card4.jpg",
      "slug": "clientf",
      "type": "Birthday",
      "categories": ["Portraits", "Videos", "Moments"],
      "cards": {
        "Portraits": [
          { "id": 1, "thumbnail": "/images/home-section/card3.jpg", "title": "Birthday Portrait 2" }
        ],
        "Videos": [
          { "id": 2, "thumbnail": "/images/home-section/card4.jpg", "title": "Birthday Video 2" }
        ],
        "Moments": [
          { "id": 3, "thumbnail": "/images/home-section/card2.jpg", "title": "Birthday Fun Moments" }
        ]
      }
    },
    {
      "id": 7,
      "name": "Client G",
      "thumbnail": "/images/home-section/card.jpg",
      "slug": "clientg",
      "type": "Portraits",
      "categories": ["Studio", "Lifestyle"],
      "cards": {
        "Studio": [
          { "id": 1, "thumbnail": "/images/home-section/card2.jpg", "title": "Studio Portrait 3" }
        ],
        "Lifestyle": [
          { "id": 2, "thumbnail": "/images/home-section/card3.jpg", "title": "Lifestyle Portrait" }
        ]
      }
    },
    {
      "id": 8,
      "name": "Client H",
      "thumbnail": "/images/home-section/card3.jpg",
      "slug": "clienth",
      "type": "Event",
      "categories": ["Corporate", "Cultural"],
      "cards": {
        "Corporate": [
          { "id": 1, "thumbnail": "/images/home-section/card4.jpg", "title": "Corporate Gathering" }
        ],
        "Cultural": [
          { "id": 2, "thumbnail": "/images/home-section/card.jpg", "title": "Cultural Festivity" }
        ]
      }
    },
    {
      "id": 9,
      "name": "Client I",
      "thumbnail": "/images/home-section/card2.jpg",
      "slug": "clienti",
      "type": "Birthday",
      "categories": ["Portraits", "Videos"],
      "cards": {
        "Portraits": [
          { "id": 1, "thumbnail": "/images/home-section/card4.jpg", "title": "Birthday Portrait 3" }
        ],
        "Videos": [
          { "id": 2, "thumbnail": "/images/home-section/card3.jpg", "title": "Birthday Video 3" }
        ]
      }
    },
    {
      "id": 10,
      "name": "Client J",
      "thumbnail": "/images/home-section/card4.jpg",
      "slug": "clientj",
      "type": "Wedding",
      "categories": ["Haldi", "Mehndi", "Reception"],
      "cards": {
        "Haldi": [
          { "id": 1, "thumbnail": "/images/home-section/card2.jpg", "title": "Haldi Celebration 2" }
        ],
        "Mehndi": [
          { "id": 2, "thumbnail": "/images/home-section/card3.jpg", "title": "Mehndi Night" }
        ],
        "Reception": [
          { "id": 3, "thumbnail": "/images/home-section/card4.jpg", "title": "Reception Highlights 2" }
        ]
      }
    }
  ]
  
  export default DATA