import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu from './src/menu/Menu'
import OptionMenu from './src/menu/OptionMenu'

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        actions: [],
        toutesActions: []
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        console.log('la saisie à changée', nouvelleSaisie)
        this.setState({ texteSaisie: nouvelleSaisie })
    }

    faireAction = (nom, title) => {
       if(nom == "Supprimer"){
         this.deleteAction(title)
       }else{
         this.terminerAction(title)
       }
   }
   terminerAction(title) {
      var newActions = this.state.actions
      var action = newActions.filter(action => action.title == title)[0]

      if(action.termine == true){
        action.termine = false;
      }else{
        action.termine = true
      }

      this.setState({ actions: newActions })
      this.setState({ toutesActions: newActions })
  }
    deleteAction(title) {
       var newActions = this.state.actions.filter(action => action.title != title)
       this.setState({ actions: newActions })
       this.setState({ toutesActions: newActions })
   }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerAction() {
        console.log('Vous avez cliqué sur Valider !')
        if(this.state.texteSaisie == '') return
         var joined = this.state.actions.concat({
            title: this.state.texteSaisie,
            termine: false
        })
        this.setState({ actions: joined })
        this.setState({ toutesActions: joined })
        this.setState({ texteSaisie: '' })
    }

    filtrer(nom){
      var filtrage = []
      
      if(nom == "Terminées"){
        filtrage = this.state.toutesActions.filter(action => action.termine == true)
      }else if (nom == "Actives") {
         filtrage = this.state.toutesActions.filter(action => action.termine == false)
      }else{
        filtrage = this.state.toutesActions
      }
      this.setState({actions:filtrage})
    }

    render() {
        const {texteSaisie} = this.state

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Entete/>
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)}/>
                    <ListeActions faireAction={this.faireAction} actions={this.state.actions}/>
                    <BoutonCreer onValider={() => this.validerAction()}/>
                    <OptionMenu filtrer={(nom) => this.filtrer(nom)}/>
                </ScrollView>
                <Menu showAll={() => this.filtrer("Toutes")} showActives={() => this.filtrer("Actives")} showTerminees={() => this.filtrer("Terminées")}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})
