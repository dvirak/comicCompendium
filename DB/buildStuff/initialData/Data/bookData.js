const books = [
  {
    id: 1,
    title: "Watchmen",
    publish_date: "2019-05-20",
    description:
      "Set in an alternate reality on the brink of nuclear war, this graphic novel follows a group of retired masked vigilantes as they uncover a sinister conspiracy threatening humanity. Through a gritty narrative and morally ambiguous characters, it explores themes of power, morality, and existentialism.",
    print_length: 414,
    series_volume: "1-12",
    cover_image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442239711i/472331.jpg",
    publisher_id: 1,
  },
  {
    id: 2,
    title: "Star Wars: War of the Bounty Hunters",
    publish_date: "2021-11-23",
    description:
      "Set in the Star Wars universe, this story follows the events surrounding Boba Fett's mission to deliver Han Solo to Jabba the Hutt, revealing a galaxy-wide conflict over the frozen carbonite slab.",
    print_length: 160,
    series_volume: "Alpha 1, 1-5",
    cover_image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1641552044i/57796295.jpg",
    publisher_id: 2,
  },
  {
    id: 3,
    title: "Batman: The Black Mirror",
    publish_date: "2011-03-05",
    description:
      "Batman confronts a series of brutal murders in Gotham City while facing his own inner demons. This graphic novel introduces Dick Grayson as Batman and explores the darker aspects of Gotham's criminal underworld.",
    print_length: 304,
    series_volume: "Batman Post Crisis #202, Detective Comics #871-881",
    cover_image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1503130842i/13533742.jpg",
  },
  {
    id: 4,
    title: "Batman Beyond, Volume 1: Escaping the Grave",
    publish_date: "2017-07-11",
    description:
      "Terry McGinnis returns as Batman in Neo-Gotham after his presumed death. Battling new and old enemies, he faces the challenge of protecting the city while uncovering secrets about his past.",
    print_length: 144,
    series_volume: "Batman Beyond (2016) #1-5, Batman Beyond: Rebirth #1",
    cover_image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1495899826i/33232943.jpg",
  },
  {
    id: 5,
    title: "The Death of Superman",
    publish_date: "2013-02-26",
    description:
      "Superman faces his ultimate challenge as he battles the monstrous Doomsday in a fight to the death. This storyline, one of the most iconic in comic book history, explores themes of heroism, sacrifice, and the impact of Superman's death on the world.",
    print_length: 160,
    series_volume:
      "Death and Return of Superman 2016 Edition (#1), Superman Post-Crisis (#20), Superman (1987) (#73-75), Superman: The Man of Steel (1991-2003) (#17-19), Esenciales DC, Post-Crisis Superman (Collected Editions)",
    cover_image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1459558444i/16156334.jpg",
  },
  {
    id: 6,
    title: "Promethea: 20th Anniversary Deluxe Edition, Book One",
    publish_date: "2019-03-12",
    description:
      "Promethea tells the story of Sophie Bangs, a young college student in a futuristic New York City who is researching the recurring figure of Promethea, a mythical heroine who has appeared in various forms throughout history. As Sophie becomes the new Promethea, she embarks on a journey through the realms of imagination, learning about magic, mythology, and the power of stories.",
    print_length: 384,
    series_volume: "Promethea #1-12",
    cover_image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1551800909i/40996652.jpg",
  },
  {
    id: 7,
    title: "Batman: The Killing Joke, The Deluxe Edition",
    publish_date: "2008-03-19",
    description:
      "A chilling exploration of the Joker's origins, this graphic novel delves into his twisted relationship with Batman, culminating in a brutal attack on Barbara Gordon. The story examines themes of madness, identity, and the thin line between hero and villain in Gotham City.",
    print_length: 64,
    series_volume: "Batman Post-Crisis #45",
    cover_image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1443698368i/2233549.jpg",
  },
  {
    id: 8,
    title: "Suki, Alone (Avatar The Last Airbender)",
    publish_date: "2021-06-22",
    description:
      "In this graphic novel set in the Avatar universe, Suki, leader of the Kyoshi Warriors, finds herself imprisoned in the Fire Nation's highest security prison. The story follows her struggle for survival and self-discovery as she navigates the harsh conditions and uncovers a plot that could change the course of the war",
    print_length: 80,
    series_volume: "Avatar: The Last Airbender Comics (#0.6)",
    cover_image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1607483841i/56227240.jpg",
  },
  {
    id: 9,
    title: "Toph Beifong's Metalbending Academy (Avatar The Last Airbender)",
    publish_date: "2021-02-16",
    description:
      "In this graphic novel set in the Avatar universe, Toph Beifong establishes and runs an academy to teach metalbending. The story explores her efforts to train a new generation of benders while dealing with her own personal challenges and the expectations placed upon her.",
    print_length: 80,
    series_volume: "Avatar: The Last Airbender Comics (#7)",
    cover_image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1595627500i/54663469.jpg",
  },
  {
    id: 10,
    title: "Katara and the Pirate's Silver (Avatar The Last Airbender)",
    publish_date: "2020-10-13",
    description:
      "In this graphic novel set in the Avatar universe, Katara embarks on an adventure where she joins a group of pirates. She must navigate the treacherous waters and outwit her newfound allies and enemies to secure a valuable treasure while staying true to her principles.",
    print_length: 80,
    series_volume: "Avatar: The Last Airbender Comics (#0.5",
    cover_image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1589918348i/52815360.jpg",
  },
  {
    id: 11,
    title: "The Unbeatable Squirrel Girl Beats Up the Marvel Universe",
    publish_date: "2016-10-11",
    description:
      "In this comedic and action-packed tale, Squirrel Girl, known for her unbeatable optimism and squirrel-based powers, finds herself facing off against the entire Marvel Universe. With her unique blend of wit and strength, she takes on some of the most formidable foes in the Marvel universe, proving that sometimes the most unexpected heroes can save the day.",
    print_length: 120,
    series_volume: "Marvel OGN(#8)",
    cover_image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1470642451i/29567266.jpg",
  },
];

module.exports = {
  books,
};
