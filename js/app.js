
var myConnections = {

	loadConnections: function() {
	
		IN.API.Connections("me")
			.fields("first-name", "last-name", "headline", "picture-url", "industry", "phone-numbers")
			.result(function(result) {
				
				console.log(result);
				var lnk = [];

				for (var index in result.values) {
				  profile = result.values[index]
				  if (!profile.pictureUrl) { profile.pictureUrl = "img/no-photo.png"; } 
				  
				var pos = {
					profileID: profile.id,
					firstName: profile.firstName,
					lastName: profile.lastName,
					pictureUrl:  profile.pictureUrl,
					headline: profile.headline,
					industry: profile.industry
				};

				lnk[index ] = pos;
			  }

			/////////////////////////////////
			//define product model
			/////////////////////////////////
			var Contact = Backbone.Model.extend({
				defaults: { }
			});
		
			/////////////////////////////////
			//define directory collection
			/////////////////////////////////
			var Directory = Backbone.Collection.extend({
				model: Contact
			});
		
			/////////////////////////////////
			//define individual contact view
			/////////////////////////////////
			var ContactView = Backbone.View.extend({
				tagName: "article",
				className: "contact-container",
				template: $("#contactTemplate").html(),
		
				render: function () {
					var tmpl = _.template(this.template);
					
					$(this.el).html(tmpl(this.model.toJSON()));
					return this;
				}
			});
	
			////////////////////////
			//define master view
			////////////////////////
			var DirectoryView = Backbone.View.extend({
				el: $("#contacts"),
		
				initialize: function () {
					this.collection = new Directory(lnk);
					this.render();
				},
		
				render: function () {
					var that = this;
					_.each(this.collection.models, function (item) {
						that.renderContact(item);
					}, this);
				},
		
				renderContact: function (item) {
					var contactView = new ContactView({
						model: item
					});
					this.$el.append(contactView.render().el);
				}
			});
		
			/////////////////////////////////
			//create instance of master view
			/////////////////////////////////
			var directory = new DirectoryView();
			
		});

	
   } //loadConnections
	
} //myConnections	