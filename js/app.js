/*Order - An order, in this context, is simply an order that a user enters / syncs into our system. Information that is contained in an order should be thought of as being the same as the eCommerce site you built.

All elements should be built for a full screen environment. Formatting and stylization are not important. This project is read only, do not worry about writing to the server.

Using backbone.js and jQuery build a table view of orders and transition to a detailed order view. The transition should load sample data via ajax. Only nvp data should be exchanged from front to back and back to front.

The table view should consist of a finite list of orders in the main area and have a navigation area to the left. The main table view should contain limited order information. The panel on the left does not require content.

Upon clicking an order the left panel should transition to a new panel, the "detailed" view. Additionally, the main area should gracefully load detailed order information. Once again, no styling required, simply show the information being passed.

A button should exist to transition from the detailed view back to the original order view.*/

//Model    
    window.Contact = Backbone.Model.extend();
    //Did't set defaults for this...
//Collection
    window.Contact_list = Backbone.Collection.extend({
        model: Contact
    });

//Views
    window.ContactListView = Backbone.View.extend({
        tagName: 'table',
        render:function (eventName) {
            _.each(this.model.models, function (contact) {
                $(this.el).append(new ContactItemView({model:contact}).render().el);
            }, this);
            return this;
            //console.log(this.collection.get(1));
        }
    });
    //Build

    window.ContactItemView = Backbone.View.extend({
            tagName: "tr",
            template:_.template($("#order-item").html()),

            initialize: function () {
                this.collection = new Contact_list(contacts);
                this.collection.bind("reset", this.render, this);
                //console.log(this.collection.get(1));
            },

            render:function () {
                    $(this.el).html(this.template(this.model.toJSON()));
                    return this;
        }
    });
    //Merge
    //Build the Main list of Orders

    window.OrderView = Backbone.View.extend({
            className: "detailed-view",
            template:_.template($("#order-details").html()),
            render: function () {
                    $(this.el).html(this.template(this.model.toJSON()));
                    return this;
        }
    });
    //Default created DIV and detailed-view Class
    //Build the Detailed orders

//Routing
    var Routeit = Backbone.Router.extend({

    routes:{
        "":"detailedviewer",
        "contacts/:id":"contactDetails"
    },
    //Route to two different views
    detailedviewer:function () {
        this.contactList = new Contact_list(contacts);
        this.contactListView = new ContactListView({model:this.contactList});
        $('#transactions').html(this.contactListView.render().el);
    },

    contactDetails:function (id) {
        this.contact = this.contactList.get(id);
        this.contactView = new OrderView({model:this.contact});
        $('#main').html(this.contactView.render().el);
    }
});
//The data
    window.contacts = [
        { id: 1, first_name: "Bob", last_name: "Bobberson", address: "1, Street, City, State, Zip Code", telephone: "0123456789", product: "gloves", transnumber: "IH932823h", amount: "15", price: "$10.99", type: "clothing"},
        { id: 2, first_name: "Karrie", last_name: "Sherry", address: "2, Street, City, State, Zip Code", telephone: "876875987", product: "gloves", transnumber: "IH932823h", amount: "15", price: "$10.99", type: "clothing"},
        { id: 3, first_name: "James", last_name: "Dean", address: "3, Street, City, State, Zip Code", telephone: "8908765", product: "gloves", transnumber: "IH932823h", amount: "15", price: "$10.99", type: "clothing"},
        { id: 4, first_name: "Eric", last_name: "Hinkle", address: "4, Street, City, State, Zip Code", telephone: "2345678", product: "gloves", transnumber: "IH932823h", amount: "15", price: "$10.99", type: "socks" },
        { id: 5, first_name: "Jeb", last_name: "Bubba", address: "5, Street, City, State, Zip Code", telephone: "765455687", product: "gloves", transnumber: "IH932823h", amount: "15", price: "$10.99", type: "animal" },
        { id: 6, first_name: "Tim", last_name: "Skaggs", address: "6, Street, City, State, Zip Code", telephone: "6567897", product: "gloves", transnumber: "IH932823h", amount: "15", price: "$10.99", type: "clothing" },
        { id: 7, first_name: "Mark", last_name: "Hill", address: "7, Street, City, State, Zip Code", telephone: "3456789", product: "gloves", transnumber: "IH932823h", amount: "15", price: "$10.99", type: "socks" },
        { id: 8, first_name: "April", last_name: "Oneil", address: "8, Street, City, State, Zip Code", telephone: "67545678", product: "gloves", transnumber: "IH932823h", amount: "15", price: "$10.99", type: "hats" }
    ];
////////////////////////Run the damn thing!//////////////////////
    var app = new Routeit();
    //Make the URLs in Routeit
    Backbone.history.start();