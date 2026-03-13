import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (

    
    <NativeTabs>
      <NativeTabs.Trigger name="pokemon">
        <Icon
          {...Platform.select({
            ios: { sf: { default: 'list.bullet', selected: 'list.bullet' } },
            android: { drawable :"ic_menu_sort_by_size" },
          })}
        />
        <Label>Pokedex</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="favourite">
        <Icon
          {...Platform.select({
            ios: { sf: { default: 'heart', selected: 'heart.fill' } },
            android: { 
                drawable : "star_on" },
          })}
        />
        <Label>Favourites</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}