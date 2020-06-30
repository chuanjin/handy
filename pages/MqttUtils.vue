<template>
    <div>
        <section class="hero is-medium is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        MQTT client
                    </h1>
                    <h2 class="subtitle">
                        using Websocket, Vue.js and Bulma
                    </h2>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="box" id="connection">
                <div class="columns">

                    <div class="column is-3">
                        <div class="field">
                            <label class="label">Host</label>
                            <p class="control has-icons-left has-icons-right">
                                <input class="input is-success" v-model="host" type="text" placeholder="localhost">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-cloud"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-asterisk"></i>
                                </span>
                            </p>
                        </div>
                    </div>

                    <div class="column is-2">
                        <div class="field">
                            <label class="label">Port</label>
                            <p class="control has-icons-left has-icons-right">
                                <input class="input is-success" v-model="port" type="text" placeholder="1884">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-sun"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-asterisk"></i>
                                </span>
                            </p>
                        </div>
                    </div>

                    <div class="column is-5">
                        <div class="field">
                            <label class="label">Client ID</label>
                            <p class="control has-icons-left">
                                <input class="input is-success" v-model="clientId" type="text" placeholder="Enter or Generate an ID">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-id-card"></i>
                                </span>
                            </p>
                        </div>
                    </div>

                    <div class="column is-2">
                        <label class="label">ID Generator</label>
                        <a class="button is-info" @click="generateID">Generate a random ID</a>
                    </div>

                </div>

                <label class="label">Clean Session
                    <input type="checkbox" checked @click="toggleCS">
                </label>

                <label class="label">useSSL
                    <input type="checkbox" checked @click="toggleSSL">
                </label>

                <hr>

                <label class="label">Credentials
                    <span class="icon">
                        <a @click="toggleCred">
                            <i :class="credIcon"></i>
                        </a>
                    </span>
                </label>

                <div class="box" v-show="credShow">
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label">Username: </label>
                                <p class="control has-icons-left">
                                    <input class="input is-success" v-model="username" type="text" placeholder="Username">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Password: </label>
                                <p class="control has-icons-left">
                                    <input class="input is-success" v-model="password" type="password" placeholder="Password">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr>

                <label class="label">Last Will
                    <span class="icon">
                        <a @click="toggleLW">
                            <i :class="lwIcon"></i>
                        </a>
                    </span>
                </label>

                <div class="box" v-show="lwShow">
                    <div class="columns">
                        <div class="column is-4">
                            <label class="label">Last Will Topic</label>
                            <p class="control has-icons-left">
                                <input class="input is-success" v-model="willTopic" type="text" placeholder="Will Topic">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-pencil-alt"></i>
                                </span>
                            </p>
                        </div>
                        <div class="column is-6">
                            <label class="label">Last Will Payload</label>
                            <p class="control">
                                <input class="input is-success" v-model="willPayload" type="text" placeholder="Will Payload">
                            </p>
                        </div>

                        <div class="column is-1">
                            <p class="control">
                                <label class="label">QoS</label>
                                <span class="select">
                                    <select v-model="willQoS">
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </span>
                            </p>
                        </div>
                        <div class="column is-1">
                            <label class="label">Retain</label>
                            <input type="checkbox" @click="toggleWillRetain">
                        </div>
                    </div>
                </div>
                <hr>

                <div class="columns">
                    <div class="column is-2">
                        <div class="field">
                            <p class="control">
                                <label class="label">Status:
                                    <span class="icon">
                                        <i :class="statusIcon"></i>
                                    </span>
                                </label>
                            </p>
                            <div class="control">
                                <div class="button is-link" @click="connect">Connect</div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-9">
                        <div v-if="status">
                            <div class="notification is-success">
                                {{notification}}
                            </div>
                        </div>
                        <div v-else>
                            <div class="notification">
                                {{notification}}
                            </div>
                        </div>
                    </div>
                </div>

                <article class="message is-warning">
                    <div class="message-header">
                        <p>Publish & Subscribe</p>
                    </div>
                    <div class="message-body">
                        <div class="columns">
                            <div class="column">
                                <div class="box">
                                    <div class="field">
                                        <label class="label">Topic to publish</label>
                                        <p class="control has-icons-left has-icons-right">
                                            <input class="input is-success" v-model="pubTopic" type="text" placeholder="Topic">
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-pencil-alt"></i>
                                            </span>
                                            <span class="icon is-small is-right">
                                                <i class="fa fa-asterisk"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <div class="field">
                                        <label class="label">Payload</label>
                                        <p class="control has-icons-left has-icons-right">
                                            <textarea class="textarea" v-model="payload" placeholder="Payload"></textarea>
                                            <span class="icon is-small is-right">
                                                <i class="fa fa-asterisk"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <div class="field">
                                        <p class="control">
                                            <label class="label">QoS</label>
                                            <span class="select">
                                                <select v-model="pubQoS">
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                </select>
                                            </span>
                                        </p>
                                    </div>
                                    <p class="control">
                                        <label class="label">Retain
                                            <input type="checkbox" @click="toggleRetain">
                                        </label>
                                        <div class="field">
                                            <div class="button is-primary" :disabled="disabledBtn" @click="publish">Publish</div>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            <div class="column">
                                <div class="box">
                                    <div class="field">
                                        <label class="label">Topic to subscribe</label>
                                        <p class="help is-success">{{subAck}}</p>
                                        <p class="control has-icons-left has-icons-right">
                                            <input class="input is-success" v-model="subTopic" type="text" placeholder="+/#">
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-pencil-alt"></i>
                                            </span>
                                            <span class="icon is-small is-right">
                                                <i class="fa fa-asterisk"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <div class="field">
                                        <p class="control">
                                            <label class="label">QoS</label>
                                            <span class="select">
                                                <select v-model="subQoS">
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                </select>
                                            </span>
                                        </p>
                                    </div>
                                    <div class="field">
                                        <div class="button is-primary" :disabled="disabledBtn" @click="subscribe">Subscribe</div>
                                    </div>
                                    <MessageList :messages="items"></MessageList>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <Footer/>
    </div>
</template>


<script>

import MessageList from '@/components/MessageList.vue'
import Footer from '@/components/Footer.vue'

export default {

  head () {
    return {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js' }
      ]
    }
  },


    components: {
        MessageList,
        Footer
    },

    data() {
        return {
            host: '',
            port: '',
            status: false,
            statusIcon: 'fa fa-times',
            clientId: '',
            cleanSession: true,
            useSSL: true,
            credShow: false,
            credIcon: "fa fa-angle-double-down",
            username: '',
            password: '',
            notification: 'No Connection',
            lwShow: false,
            lwIcon: "fa fa-angle-double-down",
            willTopic: '',
            willPayload: '',
            willQoS: 0,
            willRetain: false,
            pubTopic: '',
            pubQoS: 0,
            retain: false,
            payload: '',
            subTopic: '',
            subQoS: 0,
            subAck: '',
            disabledBtn: true,
            items: [],
            client: null,
            will: null
        }
    },

    methods: {

        connect: function() {
            this.client = new Paho.MQTT.Client(this.host, Number(this.port), this.clientId)
            var options = {
                userName: this.username,
                password: this.password,
                cleanSession: this.cleanSession,
                useSSL: this.useSSL,
                onSuccess: this.onConnect,
                onFailure: this.onFailure
            }
            if (this.willTopic != '') {
                this.will = new Paho.MQTT.Message(this.willPayload)
                this.will.destinationName = this.willTopic
                this.will.qos = Number(this.willQoS)
                this.will.retained = this.willRetain
                options.willMessage = this.will
            }
            this.client.onConnectionLost = this.onConnectionLost;
            this.client.onMessageArrived = this.onMessageArrived;
            try{
              this.client.connect(options);
            }
            catch(err){
              console.log(err)
            }
        },

        subscribe: function() {
            var options = {
                qos: Number(this.subQoS),
                onSuccess: this.onSubSuccess,
                onFailure: this.onSubFailure
            };
            this.client.subscribe(this.subTopic, options);
        },

        publish: function() {
            this.client.send(this.pubTopic, this.payload, Number(this.pubQoS), this.retain)
        },

        toggleCS: function() {
            this.cleanSession = !this.cleanSession
        },

        toggleSSL: function() {
            this.useSSL = !this.useSSL
        },

        toggleCred: function() {
            this.credShow = !this.credShow
            if (this.credShow) {
                this.credIcon = "fa fa-angle-double-up"
            } else {
                this.credIcon = "fa fa-angle-double-down"
            }
        },

        toggleLW: function() {
            this.lwShow = !this.lwShow
            if (this.lwShow) {
                this.lwIcon = "fa fa-angle-double-up"
            } else {
                this.lwIcon = "fa fa-angle-double-down"
            }
        },

        toggleRetain: function() {
            this.retain = !this.retain
        },

        toggleWillRetain: function() {
            this.willRetain = !this.willRetain
        },

        generateID: function() {
            this.clientId = this.createGuid()
        },


        updateValues: function(status, notification) {
            this.notification = notification
            this.status = status
            if (status) {
                this.statusIcon = "fa fa-check"
                this.disabledBtn = false
            } else {
                this.statusIcon = "fa fa-times"
                this.disabledBtn = true
                this.subAck = ""
            }
        },

        onConnect: function () {
            this.updateValues(true, "Connected")
        },

        onFailure: function(message) {
            this.updateValues(false, "Fail to Connect")
            console.log(message)
        },

        onConnectionLost: function(responseObject) {
            this.updateValues(false, "Connection Lost")
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
            }
        },

        onMessageArrived: function (message) {
            var topic = message.destinationName;
            var payload = message.payloadString;
            this.items.unshift({
                topic: topic,
                payload: payload
            })
        },

        onSubFailure: function (message) {
            this.subAck = "Fail to subscribe!"
            console.log(message)
        },

        onSubSuccess: function (message) {
            this.subAck = "Subscribe!"
            console.log(message)
        },

        createGuid: function()
        {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }


    }

}

</script>
