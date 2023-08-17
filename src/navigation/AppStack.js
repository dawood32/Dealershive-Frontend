import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/homescreens/HomeScreen';
import Filter from '../components/HomeComponent/Filter';
import Profile from '../screens/homescreens/Profile';
import InventoryScreen from '../screens/homescreens/InventoryScreen';
import BottomNavigation from '../screens/homescreens/BottomNavigation';
import DealerProfile from '../screens/homescreens/DealerProfile';
import More from '../screens/homescreens/More';
import Inbox from '../screens/homescreens/Inbox';
import Chat from '../components/InboxComponent/Chat';
import ViewProfile from '../components/InboxComponent/ViewProfile';
import Media from '../components/InboxComponent/Media';
import SelectedPhoto from '../components/InboxComponent/SelectedPhoto';
import SelectedVideo from '../components/InboxComponent/SelectedVideo';
import ProductManually from '../components/AddProduct/ProductManually';
import AddProduct from '../components/AddProduct/AddProduct';
import EditProduct from '../components/AddProduct/EditProduct';
import Notification from '../screens/homescreens/Notification';
const AppStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />

      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="InventoryScreen" component={InventoryScreen} />
      <Stack.Screen name="DealerProfile" component={DealerProfile} />
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="Inbox" component={Inbox} />

      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="Media" component={Media} />
      <Stack.Screen name="SelectedPhoto" component={SelectedPhoto} />
      <Stack.Screen name="SelectedVideo" component={SelectedVideo} />
      <Stack.Screen name="ProductManually" component={ProductManually} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
      <Stack.Screen name="notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default AppStack;
