Template.index.rendered = function(){

  var addSelectedBy = function(petId){
    var userId = Meteor.users.findOne()._id;
    var selectedByArray = Adoptees.findOne(petId).selectedBy;
    console.log(selectedByArray);
    if(_.indexOf(selectedByArray, userId, true) == -1){
      Adoptees.update({_id: petId}, {$push: { selectedBy: userId}});
    };
  }

  var addPetsSelected = function(petId){
    var userId = Meteor.users.findOne()._id;
    var petsSelectedArray = Meteor.users.findOne().profile.petsSelected;
    console.log(petsSelectedArray);
    console.log(_.indexOf(petsSelectedArray, petId, true));
    if(_.indexOf(petsSelectedArray, petId, true) != -1){
      Meteor.users.update({_id: userId}, {"$push": { "profile.petsSelected" : petId}});
    };
  }

  $('a[href*=#]').click(function(){return false;});

  var animationEndEvent = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

  // var petsArray = Adoptees.find().fetch();

  // for (var i = 0; i < petsArray.length; i++) {
  //   var petId = petsArray._id;
  //   console.log(petId);
  //   //Do something
  // }

  // AdopteeImages.findOne(petsArray.findOne())

  Pet = {
    wrap: $('#pets'),
    pets: Adoptees.find().fetch(),
    add: function(){
      var random = this.pets[Math.floor(Math.random() * this.pets.length)];
      $('#pets').append("<div class='pet'><img alt='" + random.name + "' src='" + AdopteeImages.findOne(random.imageIds[0]).url() + "' /><span><strong>" + random.name + "</strong>, " + random.age + "</span></div>");
    }
  };

  var App = {
    yesButton: $('.button.yes .trigger'),
    noButton: $('.button.no .trigger'),
    blocked: false,
    like: function(liked){
      var animate = liked ? 'animateYes' : 'animateNo';
      var self = this;
      if(!this.blocked){
        this.blocked = true;
          $('.pet').eq(0).addClass(animate).one(animationEndEvent, function(){
            $('.animateYes').remove();
            $('.animateNo').remove();
            Pet.add();
            self.blocked = false;
        });
      }
    }
  };

  App.yesButton.on('mousedown', function(){
    App.like(true);
  });

  App.noButton.on('mousedown', function(){
    App.like(false);
  });

    Pet.add();
    Pet.add();
    Pet.add();
    Pet.add();

}