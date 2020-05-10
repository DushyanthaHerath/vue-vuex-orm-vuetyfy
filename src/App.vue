<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            app
            right
    >
      <v-list dense>
        <v-list-item link :to="'/'">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="'/organizations'">
          <v-list-item-action>
            <v-icon>mdi-office-building</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Organizations</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-ticket-account</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Tickets</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
            app
            color="cyan"
            dark
    >

      <v-spacer></v-spacer>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer
            color="cyan"
            app
    >
      <v-spacer></v-spacer>

      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import * as organizations from './database/organizations';
  import * as users from './database/users';
  import * as tickets from './database/tickets';
  import User from './models/User'
  import Ticket from './models/Ticket'
  import Organization from './models/Organization'

  export default {
    name: 'App',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      result: {
        organizations: [],
        tickets: [],
        users: [],
      }
    }),
    created() {
      this.initDataStore();
    },
    methods: {
      initDataStore() {
        if(organizations.default && organizations.default.length) {
          organizations.default.forEach(function (item) {
            Organization.insert({ data: item})
          });
        }
        if(users.default && users.default.length) {
          users.default.forEach(function (item) {
            User.insert({ data: item})
          });
        }
        if(tickets.default && tickets.default.length) {
          tickets.default.forEach(function (item) {
            Ticket.insert({ data: item})
          });
        }
      }
    },
  }
</script>
