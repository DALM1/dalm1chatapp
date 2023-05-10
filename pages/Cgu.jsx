import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler"; // use TouchableOpacity for clickable components

import Dalm1 from "../img/dalm11.png";

const Cgu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Image source={Dalm1} style={styles.logo} />
        <Text style={styles.titleCGU}>Conditions Générales d'Utilisation</Text>
      </View>

      <Text style={styles.cguText}>
        1. Introduction ALM1 chat"). Veuillez lire attentivement les présentes
        conditions générales d'utilisation (ci-après dénommées "Conditions")
        avant d'utiliser le Service. En utilisant le Service, vous acceptez
        d'être lié par les Conditions. Si vous n'acceptez pas les Conditions,
        veuillez ne pas utiliser le Service.
      </Text>

      <Text style={styles.cguText}>
        2. Utilisation du Service l. Vous pouvez utiliser le Service uniquement
        en conformité avec les lois et réglementations applicables. Vous
        acceptez de ne pas utiliser le Service à des fins illégales ou
        interdites par les Conditions.
      </Text>

      <Text style={styles.cguText}>
        3. Propriété intellectuelle Tous les contenus du Service, y compris les
        textes, graphiques, logos, images, sons et vidéos, sont protégés par le
        droit d'auteur et autres lois sur la propriété intellectuelle. Vous
        n'êtes pas autorisé à utiliser ces contenus sans autorisation préalable
        de leur propriétaire.
      </Text>

      <Text style={styles.cguText}>
        4. Modification du Service et des Conditions Nous nous réservons le
        droit de modifier ou d'interrompre le Service à tout moment sans
        préavis. Nous nous réservons également le droit de modifier les
        Conditions à tout moment en publiant une nouvelle version sur le
        Service. Votre utilisation continue du Service après la publication de
        modifications aux Conditions constitue votre acceptation de ces
        modifications.
      </Text>

      <Text style={styles.cguText}>
        5. Limitation de responsabilité Le Service est fourni "en l'état" sans
        garantie d'aucune sorte, expresse ou implicite. Nous ne garantissons pas
        que le Service sera ininterrompu ou exempt de défauts, ni que les
        défauts seront corrigés. Vous utilisez le Service à vos propres risques.
        En aucun cas, nous ne serons responsables de tout dommage direct,
        indirect, accessoire, consécutif, exemplaire ou punitif découlant de
        l'utilisation du Service.
      </Text>

      <Text style={styles.cguText}>
        6. Liens vers d'autres sites Le Service peut inclure des liens vers des
        sites tiers. Ces liens sont fournis uniquement pour votre commodité et
        ne signifient pas que nous approuvons ces sites. Nous ne sommes pas
        responsables du contenu ou de l'utilisation de ces sites.
      </Text>
    </View>
  );
};
export default Cgu;
