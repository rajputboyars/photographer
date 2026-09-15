// Galleries shown in the portfolio and on each gallery page.
//
// Thumbnails point at the photographs in public/images/photos.
// Replace the [Client X] names, and swap in the gallery's own cover
// photograph, before launch.

const DATA = [
  {
    "id": 1,
    "name": "Client A",
    "thumbnail": "/images/photos/wedding-ceremony.jpg",
    "slug": "clienta",
    "type": "Wedding",
    "categories": [
      "Pre-Wedding",
      "Haldi",
      "Mehndi",
      "Reception"
    ],
    "cards": {
      "Pre-Wedding": [
        {
          "id": 1,
          "thumbnail": "/images/photos/pre-wedding.jpg",
          "title": "Pre-Wedding Shoot 1"
        },
        {
          "id": 2,
          "thumbnail": "/images/photos/pre-wedding.jpg",
          "title": "Pre-Wedding Shoot 2"
        }
      ],
      "Haldi": [
        {
          "id": 3,
          "thumbnail": "/images/photos/haldi.jpg",
          "title": "Haldi Ceremony"
        }
      ],
      "Mehndi": [
        {
          "id": 4,
          "thumbnail": "/images/photos/mehndi.jpg",
          "title": "Mehndi Celebration"
        }
      ],
      "Reception": [
        {
          "id": 5,
          "thumbnail": "/images/photos/reception.jpg",
          "title": "Reception Highlights"
        }
      ]
    }
  },
  {
    "id": 2,
    "name": "Client B",
    "thumbnail": "/images/photos/birthday.jpg",
    "slug": "clientb",
    "type": "Birthday",
    "categories": [
      "Portraits",
      "Videos",
      "Moments"
    ],
    "cards": {
      "Portraits": [
        {
          "id": 1,
          "thumbnail": "/images/photos/portraits.jpg",
          "title": "Birthday Portrait 1"
        }
      ],
      "Videos": [
        {
          "id": 2,
          "thumbnail": "/images/photos/celebration.jpg",
          "title": "Birthday Video 1"
        }
      ],
      "Moments": [
        {
          "id": 3,
          "thumbnail": "/images/photos/celebration.jpg",
          "title": "Candid Moments"
        }
      ]
    }
  },
  {
    "id": 3,
    "name": "Client C",
    "thumbnail": "/images/photos/portraits.jpg",
    "slug": "clientc",
    "type": "Portraits",
    "categories": [
      "Studio",
      "Outdoor",
      "Candid"
    ],
    "cards": {
      "Studio": [
        {
          "id": 1,
          "thumbnail": "/images/photos/portraits.jpg",
          "title": "Studio Portrait 1"
        },
        {
          "id": 2,
          "thumbnail": "/images/photos/portraits.jpg",
          "title": "Studio Portrait 2"
        }
      ],
      "Outdoor": [
        {
          "id": 3,
          "thumbnail": "/images/photos/pre-wedding.jpg",
          "title": "Outdoor Portrait 1"
        }
      ],
      "Candid": [
        {
          "id": 4,
          "thumbnail": "/images/photos/celebration.jpg",
          "title": "Candid Portrait 1"
        }
      ]
    }
  },
  {
    "id": 4,
    "name": "Client D",
    "thumbnail": "/images/photos/corporate.jpg",
    "slug": "clientd",
    "type": "Event",
    "categories": [
      "Corporate",
      "Cultural",
      "Festive"
    ],
    "cards": {
      "Corporate": [
        {
          "id": 1,
          "thumbnail": "/images/photos/corporate.jpg",
          "title": "Corporate Event 1"
        }
      ],
      "Cultural": [
        {
          "id": 2,
          "thumbnail": "/images/photos/celebration.jpg",
          "title": "Cultural Event 1"
        }
      ],
      "Festive": [
        {
          "id": 3,
          "thumbnail": "/images/photos/celebration.jpg",
          "title": "Festive Celebration 1"
        }
      ]
    }
  },
  {
    "id": 5,
    "name": "Client E",
    "thumbnail": "/images/photos/wedding-ceremony.jpg",
    "slug": "cliente",
    "type": "Wedding",
    "categories": [
      "Pre-Wedding",
      "Sangeet",
      "Wedding Day"
    ],
    "cards": {
      "Pre-Wedding": [
        {
          "id": 1,
          "thumbnail": "/images/photos/pre-wedding.jpg",
          "title": "Pre-Wedding Shoot 3"
        }
      ],
      "Sangeet": [
        {
          "id": 2,
          "thumbnail": "/images/photos/sangeet.jpg",
          "title": "Sangeet Night"
        }
      ],
      "Wedding Day": [
        {
          "id": 3,
          "thumbnail": "/images/photos/wedding-ceremony.jpg",
          "title": "Wedding Day Moments"
        }
      ]
    }
  },
  {
    "id": 6,
    "name": "Client F",
    "thumbnail": "/images/photos/birthday.jpg",
    "slug": "clientf",
    "type": "Birthday",
    "categories": [
      "Portraits",
      "Videos",
      "Moments"
    ],
    "cards": {
      "Portraits": [
        {
          "id": 1,
          "thumbnail": "/images/photos/portraits.jpg",
          "title": "Birthday Portrait 2"
        }
      ],
      "Videos": [
        {
          "id": 2,
          "thumbnail": "/images/photos/celebration.jpg",
          "title": "Birthday Video 2"
        }
      ],
      "Moments": [
        {
          "id": 3,
          "thumbnail": "/images/photos/celebration.jpg",
          "title": "Birthday Fun Moments"
        }
      ]
    }
  },
  {
    "id": 7,
    "name": "Client G",
    "thumbnail": "/images/photos/portraits.jpg",
    "slug": "clientg",
    "type": "Portraits",
    "categories": [
      "Studio",
      "Lifestyle"
    ],
    "cards": {
      "Studio": [
        {
          "id": 1,
          "thumbnail": "/images/photos/portraits.jpg",
          "title": "Studio Portrait 3"
        }
      ],
      "Lifestyle": [
        {
          "id": 2,
          "thumbnail": "/images/photos/portraits.jpg",
          "title": "Lifestyle Portrait"
        }
      ]
    }
  },
  {
    "id": 8,
    "name": "Client H",
    "thumbnail": "/images/photos/corporate.jpg",
    "slug": "clienth",
    "type": "Event",
    "categories": [
      "Corporate",
      "Cultural"
    ],
    "cards": {
      "Corporate": [
        {
          "id": 1,
          "thumbnail": "/images/photos/corporate.jpg",
          "title": "Corporate Gathering"
        }
      ],
      "Cultural": [
        {
          "id": 2,
          "thumbnail": "/images/photos/celebration.jpg",
          "title": "Cultural Festivity"
        }
      ]
    }
  },
  {
    "id": 9,
    "name": "Client I",
    "thumbnail": "/images/photos/birthday.jpg",
    "slug": "clienti",
    "type": "Birthday",
    "categories": [
      "Portraits",
      "Videos"
    ],
    "cards": {
      "Portraits": [
        {
          "id": 1,
          "thumbnail": "/images/photos/portraits.jpg",
          "title": "Birthday Portrait 3"
        }
      ],
      "Videos": [
        {
          "id": 2,
          "thumbnail": "/images/photos/celebration.jpg",
          "title": "Birthday Video 3"
        }
      ]
    }
  },
  {
    "id": 10,
    "name": "Client J",
    "thumbnail": "/images/photos/wedding-ceremony.jpg",
    "slug": "clientj",
    "type": "Wedding",
    "categories": [
      "Haldi",
      "Mehndi",
      "Reception"
    ],
    "cards": {
      "Haldi": [
        {
          "id": 1,
          "thumbnail": "/images/photos/haldi.jpg",
          "title": "Haldi Celebration 2"
        }
      ],
      "Mehndi": [
        {
          "id": 2,
          "thumbnail": "/images/photos/mehndi.jpg",
          "title": "Mehndi Night"
        }
      ],
      "Reception": [
        {
          "id": 3,
          "thumbnail": "/images/photos/reception.jpg",
          "title": "Reception Highlights 2"
        }
      ]
    }
  }
]

export default DATA;
