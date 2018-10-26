import React from 'react'
import { View, StyleSheet } from 'react-native'
import OptionMenu from './OptionMenu'

/**
 * Composant Menu.
 */
const Menu = ({showAll,showActives,showTerminees}) => (
    <View style={styles.menu}>
          <OptionMenu title="Toutes" filtrer={showAll}/>
          <OptionMenu title="Actives" filtrer={showActives}/>
          <OptionMenu title="Terminées" filtrer={showTerminees}/>
    </View>
)

const styles = StyleSheet.create({
    menu: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    }
})
export default Menu
