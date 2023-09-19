import { View, TextInput } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default SearchUser = ({
  toggleSearch,
  setToggleSearch,
  setTextSearchUser,
  searchUser,
}) => {
  return (
    <View className="flex-row items-center ml-4 mt-12 relative">
      <View style={{ width: 30, height: 30 }}>
        {toggleSearch ? null : (
          <MaterialCommunityIcons
            size={30}
            name="arrow-left-bold-outline"
            onPress={() => setToggleSearch(!toggleSearch)}
          />
        )}
      </View>
      <TextInput
        className="border p-2 rounded-lg w-2/3 mx-3"
        placeholder="Rechercher..."
        onChangeText={setTextSearchUser}
      />

      <MaterialCommunityIcons
        size={30}
        name="account-search-outline"
        onPress={searchUser}
      />
    </View>
  );
};
