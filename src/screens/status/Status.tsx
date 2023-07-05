import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import StatusHeader from './components/StatusHeader';
import StatusNotSeen from './components/StatusNotSeen';
import StatusSeen from './components/StatusSeen';

const Status = () => {
  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1]}
          style={{paddingHorizontal: 8}}
          ListHeaderComponent={() => <StatusHeader />}
          ItemSeparatorComponent={() => <View style={{marginVertical: 4}} />}
          renderItem={() => <StatusNotSeen />}
          ListFooterComponent={() => (
            <View>
              <View style={{marginVertical: 10}}>
                <Text>Viewed updates</Text>
              </View>

              <View>
                <FlatList
                  data={[1, 1, 1, 1, 1, 1, 1]}
                  ItemSeparatorComponent={() => (
                    <View style={{marginVertical: 4}} />
                  )}
                  renderItem={() => <StatusSeen />}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({});
