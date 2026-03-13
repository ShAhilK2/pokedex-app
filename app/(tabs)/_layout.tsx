import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {

    
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="pokemon">
        <Icon sf={{default: 'list.bullet',selected: 'list.bullet'}} />
        <Label>Pokedex</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favourite">
        <Icon sf={{default: 'heart',selected: 'heart.fill'}} />
        <Label>Favoutites</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
