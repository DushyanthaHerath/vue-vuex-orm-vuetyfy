<template>
  <v-app>
    <v-container fluid>
      <v-toolbar
              class="mb-1"
      >
        <v-select
                v-model="values.key"
                hide-details
                :items="params.keys"
                prepend-inner-icon="mdi-magnify"
                label="Search for"
                outlined
        ></v-select>
        <v-spacer></v-spacer>
        <v-select
                v-model="values.attribute"
                outlined
                hide-details
                :items="params.attributes"
                prepend-inner-icon="mdi-magnify"
                label="Search by"
                :disabled="values.key==''"
        ></v-select>
        <v-spacer></v-spacer>
        <v-autocomplete
                v-model="values.search"
                :loading="loading"
                :items="autocomplete.items"
                :search-input.sync="autocomplete.search"
                cache-items
                outlined
                hide-details
                hide-no-data
                label="What are you searching for?"
                :disabled="values.key=='' || values.attribute==''"
        ></v-autocomplete>
        <!--<v-btn-toggle
                v-model="sortDesc"
                mandatory
        >
          <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
          >
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
          <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
          >
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
          </v-btn-toggle>-->
      </v-toolbar>
      <v-row>
        <v-col
                v-for="item in items"
                :key="item.name"
                cols="12"
                sm="6"
                md="4"
                lg="3"
        >
          <v-card>
            <v-list v-if="values.key=='' || values.key=='organization'">
              <!-- eslint-disable-next-line -->
              <!--<v-list-item v-for="(obj, field) in selected" :key="field" v-if="item[field]">
                <v-list-item-content  v-if="shouldDisplay(obj, item, field)">{{ field | name }}</v-list-item-content>
                <v-list-item-content class="align-end" v-if="shouldDisplay(obj, item, field) && (typeof obj.value == 'string' || item[field] !== Object(item[field])) ">
                  {{ item[field] | limit }}
                </v-list-item-content>
                <v-list-item-content class="align-end" v-if="shouldDisplay(obj, item, field) && Array.isArray(obj.value)">
                  <div class="d-flex flex-wrap">
                    <v-chip
                            class="ma-2"
                            x-small
                            label
                            v-for="tag in item[field]"
                            :key="tag">
                      {{tag}}
                    </v-chip>
                  </div>
                </v-list-item-content>
              </v-list-item>-->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="body-2">
                  <v-btn
                          color="info"
                          class="ma-2 white--text" rounded
                  >
                    View More
                    <v-icon right dark>mdi-more</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue darken-2">mdi-account</v-icon>
                </v-list-item-icon>

                <v-list-item-title class="body-1">Users</v-list-item-title>
              </v-list-item>
              <v-list-item v-for="user in item.users" :key="user._id">
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ user.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="body-2">{{ user.active ? 'Active' : 'Inactive' }}</v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green darken-2">mdi-ticket-account</v-icon>
                </v-list-item-icon>

                <v-list-item-title class="body-1">Tickets</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-content class="flex-row flex-wrap">
                  <v-chip
                          class="ma-2 flex-grow-1 flex-shrink-1"
                          color="success"
                          outlined
                          style="flex-basis: auto"
                          v-for="ticket in item.tickets"
                          :key="ticket.subject"
                          x-small
                  >
                    <!--<v-icon left>mdi-server-plus</v-icon>-->
                    {{ticket.subject}}
                  </v-chip>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list v-if="values.key=='user'">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="body-2">
                  <v-btn
                          color="info"
                          class="ma-2 white--text"
                  >
                    View More
                    <v-icon right dark>mdi-more</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="purple darken-2">mdi-office-building</v-icon>
                </v-list-item-icon>

                <v-list-item-title class="body-1">Organization</v-list-item-title>

              </v-list-item>
              <v-list-item v-if="item.organization">
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ item.organization.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.organization.details }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green darken-2">mdi-ticket-account</v-icon>
                </v-list-item-icon>

                <v-list-item-title class="body-1">Assigned Tickets</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-content class="flex-row flex-wrap">
                  <v-chip
                          class="ma-2 flex-grow-1 flex-shrink-1"
                          color="success"
                          outlined
                          style="flex-basis: auto"
                          v-for="ticket in item.assigned"
                          :key="ticket.subject"
                          x-small
                  >
                    <!--<v-icon left>mdi-server-plus</v-icon>-->
                    {{ticket.subject}}
                  </v-chip>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green darken-2">mdi-ticket-account</v-icon>
                </v-list-item-icon>

                <v-list-item-title class="body-1">Submitted Tickets</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-content class="flex-row flex-wrap">
                  <v-chip
                          class="ma-2 flex-grow-1 flex-shrink-1"
                          color="success"
                          outlined
                          style="flex-basis: auto"
                          v-for="ticket in item.submitted"
                          :key="ticket.subject"
                          x-small
                  >
                    <!--<v-icon left>mdi-server-plus</v-icon>-->
                    {{ticket.subject}}
                  </v-chip>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list v-if="values.key=='ticket'">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.subject }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="body-2">
                  <v-btn
                          color="info"
                          class="ma-2 white--text" rounded
                  >
                    View More
                    <v-icon right dark>mdi-more</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="purple darken-2">mdi-office-building</v-icon>
                </v-list-item-icon>

                <v-list-item-title class="body-1">Organization</v-list-item-title>

              </v-list-item>
              <v-list-item v-if="item.organization">
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ item.organization.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.organization.details }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue darken-2">mdi-account</v-icon>
                </v-list-item-icon>

                <v-list-item-title class="body-1">Assigned to</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="item.assignee">
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ item.assignee.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="body-2">{{ item.assignee.active ? 'Active' : 'Inactive' }}</v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="yellow darken-2">mdi-account</v-icon>
                </v-list-item-icon>

                <v-list-item-title class="body-1">Submitted by</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="item.submitter">
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ item.submitter.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="body-2">{{ item.submitter.active ? 'Active' : 'Inactive' }}</v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Organization from './../models/Organization'
import User from './../models/User'
import Ticket from './../models/Ticket'

export default {
  name: 'Search',
  data: () => ({
    params: {
      search: '',
      keys: [{text:"Organization",value:'organization'},{text:"Users",value:'user'},{text:"Tickets",value:'ticket'}],
      attributes: []
    },
    values: {
      search: null,
      key: '',
      attribute: ''
    },
    models: {
      organization: null,
      ticket: null,
      user: null
    },
    items: [],
    loading: false,
    autocomplete: {
      items: [],
      search: null
    },
  }),
  computed: {
    selected() {
      return this.models[this.values.key] ? this.models[this.values.key] : this.models.organization;
    }
  },
  methods: {
    searchData() {
      if(this.values.key=='' && this.values.search==null && this.values.attribute=='') {
        this.items = Organization.query().with(['tickets', 'users']).get();
      }
      if(this.values.key) {
        switch (this.values.key) {
          case 'organization': {
            this.items = Organization.query().with(['tickets', 'users']).get();
            break;
          }
          case 'ticket': {
            this.items = Ticket.query().with(['organization', 'assignee', 'submitter']).get();
            break;
          }
          case 'user': {
            this.items = User.query().with(['assigned', 'submitted', 'organization']).get();
            break;
          }
        }
      }
    },
    setModels() {
      this.models.organization = Organization;
      this.models.ticket = Ticket;
      this.models.user = User;
    },
    shouldDisplay(host, item, key) { // eslint-disable-line
      return Object.prototype.hasOwnProperty.call(host, "value") && item[key];
    },
    querySelections (v) {
      this.loading = true
      let self = this;
      let entity = this.models[this.values.key];
      let param = this.values.attribute;
      let isArray = Array.isArray(entity.fields()[param].value);
      let matches = entity.query().where((query) => { // eslint-disable-line
        if(isArray){
          return query[param].filter(function (item) {
            return item.includes(v);
          }).length > 0;
        } else {
          return query[param].includes(v);
        }
      }).get();
      this.autocomplete.items = [];
      matches.forEach(function (item) {
        self.autocomplete.items.push(isArray ? { text: item[param].join(', '), value: item._id} : { text: item[param], value: item._id});
      });
      this.loading = false;
    },
  },
  mounted() {
    this.searchData();
    this.setModels();
  },
  filters: {
    name: function (string) {
      return string ? (string.charAt(0).toUpperCase() + string.slice(1)).replace(/_/g, ' ') : '';
    },
    limit: function (string) {
      return string ? (string.length>18) ? string.substring(0, 18)+'...' : string : '';
    }
  },
  watch: {
    'values.key' : function (val) {
      this.values.search = null;
      this.values.attribute = '';
      this.searchData();
      if(val) {
        this.params.attributes = [];
        for (let [key, value] of Object.entries(this.models[val].fields())) { // eslint-disable-line
          this.params.attributes.push(key);
        }
      }
    },
    'autocomplete.search' : function (val) {
      val && val !== this.values.search && this.querySelections(val)
    },
    'values.search' : function (val) {
      if(this.values.key) {
        switch (this.values.key) {
          case 'organization': {
            this.items = Organization.query().where('_id',val).with(['tickets', 'users']).get();
            break;
          }
          case 'ticket': {
            this.items = Ticket.query().where('_id',val).with(['organization', 'assignee', 'submitter']).get();
            break;
          }
          case 'user': {
            this.items = User.query().where('_id',val).with(['assigned', 'submitted', 'organization']).get();
            break;
          }
        }
      }
    }
  }
}
</script>
