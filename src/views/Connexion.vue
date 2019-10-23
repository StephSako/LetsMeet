<template>
    <v-app>
        <v-card width="400" class="mx-auto mt-5">
            <v-card-title>
                <h1 class="display-1">Login</h1>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                    label="Email"
                    prepend-icon="mdi-account-circle"/>
                    <v-text-field
                    :type="showPassword ? 'text' : 'password'"
                    label="Mot de passe"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword=!showPassword"
                    />
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="success">Connexion</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info">Inscription</v-btn>
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
