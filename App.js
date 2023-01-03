/* eslint-disable react-native/no-inline-styles */
// React Native Video 
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, StatusBar, TouchableOpacity, Button} from 'react-native';
import Video, {FilterType} from 'react-native-video';
import Anime from './Anime.mp4';

const ListItem = ({text, onSelect}) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={{borderBottomWidth: 0.8, margin: 5, paddingBottom: 10}}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

function VideoListScreen({navigation}) {
  return (
    <View style={{margin: 10}}>
      <StatusBar barStyle={'light-content'} />

      <ListItem
        onSelect={() =>
          navigation.navigate('Video Player', {
            external: true,
            videoURL: 'https://www.w3schools.com/html/mov_bbb.mp4',
          })
        }
        text={'External Video Source'}
      />
      <ListItem
        onSelect={() =>
          navigation.navigate('Video Player', {
            external: false,
            videoURL: Anime,
          })
        }
        text={'Internal Video Source'}
      />
    </View>
  );
}

function VideoPlayerScreen({route}) {
  const {external, videoURL} = route.params;
  const [filterType, setFilterType] = useState(FilterType.NONE);

  const changeFilter = type => {
    setFilterType(type);
  };
  return (
    <View style={{height: '100%', padding: 20}}>
      <Video
        controls
        playInBackground={false}
        repeat
        paused={false}
        filterEnabled
        filter={filterType}
        muted={false}
        fullscreen
        source={external ? {uri: videoURL} : videoURL}
        style={{flex: 1}}
        resizeMode="contain"
      />
      <Button title="Mono" onPress={() => changeFilter(FilterType.MONO)} />
      <Button title="Sepia" onPress={() => changeFilter(FilterType.SEPIA)} />
      <Button title="Chrome" onPress={() => changeFilter(FilterType.CHROME)} />
      <Button title="None" onPress={() => changeFilter(FilterType.NONE)} />
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Video List" component={VideoListScreen} />
        <Stack.Screen name="Video Player" component={VideoPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
