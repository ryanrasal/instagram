import React from "react";
import { View, ScrollView } from "react-native";
import one from "../../assets/stories/one.jpg";
import two from "../../assets/stories/two.jpg";
import three from "../../assets/stories/three.jpg";
import four from "../../assets/stories/four.jpg";
import five from "../../assets/stories/five.jpg";
import nature1 from "../../assets/stories/nature1.jpg";
import nature2 from "../../assets/stories/nature2.jpg";
import nature3 from "../../assets/stories/nature3.jpg";
import nature4 from "../../assets/stories/nature4.jpg";
import nature5 from "../../assets/stories/nature5.jpg";
import CardPublication from "../components/Home/CardPublication";

export default function Home() {
  const publications = [
    {
      id: 1,
      lastname: "Patrick",
      firstname: "Swayze",
      pseudo: "Patouche",
      image: one,
      imageVideoURL: nature1,
      legende:
        "Le soleil se couche lentement derrière les montagnes, teintant le ciel d'une palette de couleurs chaudes. Les derniers rayons de lumière se reflètent sur les eaux calmes du lac, créant un miroir étincelant de la nature environnante.Les arbres, vêtus de leurs feuilles d'automne, se balancent doucement dans la brise légère. Le parfum des fleurs sauvages embaume l'air, ajoutant une touche sucrée à l'atmosphère sereine.Au loin, on peut apercevoir un groupe d'oiseaux migrateurs qui traversent le ciel en formant une V majestueuse. Leurs appels mélodieux se mélangent aux sons apaisants de la nature, créant une symphonie harmonieuse.Dans ce paysage enchanteur, la tranquillité règne en maître. Le temps semble s'arrêter, offrant un moment de calme et de contemplation. C'est un endroit où l'on peut se perdre dans la beauté de la nature et se ressourcer en puisant dans la force de cet environnement paisible.",
    },
    {
      id: 2,
      lastname: "Kennedi",
      firstname: "Patricia",
      pseudo: "Pali",
      image: two,
      imageVideoURL: nature2,
      legende: "Ceci est le legendee de l'utilisateur 1.",
    },
    {
      id: 3,
      lastname: "Garcia",
      firstname: "Maria",
      pseudo: "maria_garcia",
      image: three,
      imageVideoURL: nature3,
      legende: "Ceci est le legendee de l'utilisateur 1.",
    },
    {
      id: 4,
      lastname: "Kim",
      firstname: "Sung",
      pseudo: "sungkim",
      image: four,
      imageVideoURL: nature4,
      legende: "Ceci est le legendee de l'utilisateur 1.",
    },
    {
      id: 5,
      lastname: "Müller",
      firstname: "Hans",
      pseudo: "hans_mueller",
      image: five,
      imageVideoURL: nature5,
      legende: "Ceci est le texte de l'utilisateur 1.",
    },
  ];

  return (
    <ScrollView>
      {publications.map((publication) => (
        <CardPublication key={publication.id} publication={publication} />
      ))}
    </ScrollView>
  );
}
