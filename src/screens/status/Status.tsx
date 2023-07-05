import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import StatusHeader from './components/StatusHeader';
import StatusNotSeen from './components/StatusNotSeen';
import StatusSeen from './components/StatusSeen';
import StatusFooter from './components/StatusFooter';

const Status = () => {
  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1]}
          style={{paddingHorizontal: 15}}
          ListHeaderComponent={() => <StatusHeader />}
          ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
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
                    <View style={{marginVertical: 8}} />
                  )}
                  renderItem={() => <StatusSeen />}
                  ListFooterComponent={() => <StatusFooter />}
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
