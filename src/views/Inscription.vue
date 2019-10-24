<template>
    <v-app>
        <v-card width="400" class="mx-auto mt-5">
            <v-card-title>
                <h1 class="display-1">Inscription</h1>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                    label="Nom"
                    prepend-icon="mdi-account-card-details"/>
                    <v-text-field
                    label="Prénom"
                    prepend-icon="mdi-account-card-details"/>
                    <v-text-field
                    label="Email"
                    prepend-icon="mdi-email"/>
                    <v-text-field
                    :type="showPassword ? 'text' : 'password'"
                    label="Mot de passe"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword=!showPassword"
                    />
                    <v-file-input label="Image de profil"></v-file-input>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn rounded color="success">Inscription</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info"><router-link to="/connexion">Connexion</router-link></v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>
export default {
  name: 'Connexion',
  data: () => ({
    showPassword: false
  })
}
</script>
