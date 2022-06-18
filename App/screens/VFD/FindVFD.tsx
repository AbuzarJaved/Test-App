import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Platform} from 'react-native';
import {Card, Button, Avatar, RadioButton} from 'react-native-paper';
import {COLORS, SIZES, FONTS} from '../../constants';
import {Header, AnimatedButton} from '../../components';
import {useSelector, useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {RootState} from '../../store/store';
import {AppParamList} from '../../routes/AppNavigation/AppParamList';
import {BottomTabParamList} from '../../routes/BottomTabNavigation/BottomTabParamList';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {fetchUsers,} from '../../store/Reducers/userSlice';

type findVFDNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<AppParamList, 'Main'>,
  BottomTabNavigationProp<BottomTabParamList, 'FindVFD'>
>;

const FindVFD = () => {
  const navigation: findVFDNavProp = useNavigation();
  const dispatch = useDispatch();
  const [phase, setPhase] = useState('');
  const [easySeq, setEasySeq] = useState('');
  const [selectedVoltage, setSelectedVoltage] = useState(undefined);
  const [selectedHorsepower, setSelectedHorsepower] = useState(undefined);
  const users = useSelector((state: RootState) => state?.counter.list);
  const val = useSelector((state: RootState) => state?.counter.value);

  useEffect(() => {
    // dispatch(fetchUsers());
  }, []);

  const LeftContent = (props: any) => (
    <Avatar.Image
      size={30}
      style={{backgroundColor: COLORS.vfdGray}}
      source={require('../../assets/icons/search_white.png')}
    />
  );

  const reset = () => {
    setPhase('');
    setEasySeq('');
    setSelectedHorsepower(undefined);
    setSelectedVoltage(undefined);
    navigation.navigate('ImageConveter')
  };

  const searchVFDResult = () => {
    navigation.navigate('Catalog', {
      phase: phase,
      easySeq: easySeq,
      selectedHorsepower: selectedHorsepower,
      selectedVoltage: selectedVoltage,
    });
  };

  return (
    <View style={styles.container}>
      <Header />

      <Card style={{flex: 1, backgroundColor: COLORS.primaryColor}}>
        <Card.Title
          title="Find VFD"
          left={LeftContent}
          titleStyle={{color: COLORS.white}}
          style={{backgroundColor: COLORS.vfdGray}}
        />

        <Card.Content>
          <RadioButton.Group
            onValueChange={(value: any) => setPhase(value)}
            value={phase}>
            <RadioButton.Item
              label="Single Phase"
              value="1"
              style={{
                backgroundColor: COLORS.white,
                marginVertical: SIZES.base,
                borderColor: COLORS.vfdRed,
                borderRadius: 6,
                borderWidth: 0.3,
              }}
              labelStyle={{color: COLORS.vfdGray}}
            />
            <RadioButton.Item
              label="Three Phase"
              value="3"
              style={{
                backgroundColor: COLORS.white,
                borderColor: COLORS.vfdRed,
                borderRadius: 6,
                borderWidth: 0.3,
              }}
              labelStyle={{color: COLORS.vfdGray}}
            />
          </RadioButton.Group>

          <View style={styles.pickerContainer}>
            <View
              style={{justifyContent: 'center', marginVertical: SIZES.base}}>
              <Text
                style={{
                  fontSize: SIZES.body3,
                  color: COLORS.vfdGray,
                  textAlign: 'center',
                }}>
                Please Select Voltage & Horsepower
              </Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Picker
                style={{width: 150}}
                itemStyle={{fontSize: SIZES.body3}}
                selectedValue={selectedVoltage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedVoltage(itemValue)
                }>
                <Picker.Item label="100-120" value="100-120" />
                <Picker.Item label="200-240" value="200-240" />
                <Picker.Item label="380-480" value="380-480" />
              </Picker>

              <Picker
                style={{width: 150}}
                itemStyle={{fontSize: SIZES.body3}}
                selectedValue={selectedHorsepower}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedHorsepower(itemValue)
                }>
                <Picker.Item label="1/8" value="1/8" />
                <Picker.Item label="1/4" value="1/4" />
                <Picker.Item label="1/2" value="1/2" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="71/2" value="71/2" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="40" value="40" />
              </Picker>
            </View>
          </View>

          <RadioButton.Group
            onValueChange={(value: any) => setEasySeq(value)}
            value={easySeq}>
            <RadioButton.Item
              label="Easy Sequence"
              value="true"
              style={{
                backgroundColor: COLORS.white,
                borderColor: COLORS.vfdRed,
                borderWidth: 0.3,
                borderRadius: 6,
              }}
              labelStyle={{color: COLORS.vfdGray}}
            />
          </RadioButton.Group>
        </Card.Content>

        <Card.Actions
          style={{justifyContent: 'space-evenly', padding: SIZES.h1}}>
          <Button
            mode="contained"
            color={COLORS.vfdRed}
            onPress={() => {
              searchVFDResult();
            }}
            contentStyle={{width: 100, height: 40}}>
            Find
          </Button>
          <Button
            mode="contained"
            color={COLORS.vfdRed}
            onPress={() => {
              reset();
            }}
            contentStyle={{width: 100, height: 40}}>
            Reset
          </Button>
        </Card.Actions>
        <Card.Content>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.white,
              padding: SIZES.base,
              borderColor: COLORS.vfdGray,
              borderWidth: 0.3,
              borderRadius: 6,
            }}>
            <Text style={{color: COLORS.black, fontSize: SIZES.body3}}>
              Still Need Help?
            </Text>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingTop: SIZES.base,
              }}>
              <Text>Email: </Text>
              <Text>Inverter.info@hitachi-iesa.com</Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text>Phone: </Text>
              <Text>+1 -980-500-7141</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    marginVertical: SIZES.base,
    borderColor: COLORS.vfdRed,
    borderRadius: 6,
    borderWidth: 0.3,
  },
});

export default FindVFD;
