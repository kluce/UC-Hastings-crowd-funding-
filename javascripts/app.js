function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}   

$(document).ready(function() {

	var data;

	var Campaign = Backbone.Model.extend({});

	var Campaigns = Backbone.Collection.extend({
		model: new Campaign(),
		initialize: function() {
			var that = this;
			/*$.getJSON('/api/v1/campaigns', function(data) {
				that.results = data;
				console.log(data);
			})*/
		}
	});
	
	var App = Backbone.View.extend({
		el: $('body'),
		collection: new Campaigns(),
		initialize: function() {
			//this.render();
		},
		render: function() {
			var source = $('#main').html();
			var template = Handlebars.compile(source);
			var id = getUrlParameter('id');
			var all = '/api/v1/campaigns';
			var single = '/api/v1/campaign/' + id;


			if(id){

				var query = single;
				console.log('single');

			} else{
				var query = all;
				console.log('all');
			}

			
			$.ajax({
			    cache: false,
			    url: query,
			    dataType: "json",
			    success: function(data) {
			        console.log(data);
			        for (var i = data.length - 1; i >= 0; i--) {
			        	data[i].percent = parseInt(data[i].pledged/data[i].total)
			        };
					var html = template({data: data});
					$('#container').html(html);
					$('.menu-link')
					.click(function() {
							if($('#container').offset().left > 0) {
								$("#container, #mobile-nav").css("left", "0px");
								$(".navbar-brand").show();
							}else {
								$("#container").css("left", "233px");
								$("#mobile-nav").css("left", "218px");
								$(".navbar-brand").hide();
							}
					})
					.bigSlide();
			    }
			});
		}
	});


	var kickstarter = new App();


	var Router = Backbone.Router.extend({
		routes: {
			"" : 'main',
			"test" : 'test'
		},
		main: function(){
			kickstarter.render();
		},
		test: function(){
			console.log("You are here!");
		}
	});


	var router = new Router();
	Backbone.history.start();


});