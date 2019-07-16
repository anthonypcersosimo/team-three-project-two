$(document).ready(function() {
  // deckContainer holds all of our decks
  var deckContainer = $(".deck-container");
  var deckHeader = $("#deck-header");
  // Click events for the edit and delete buttons
  // $(document).on("click", "button.delete", handlePostDelete);
  // $(document).on("click", "button.edit", handlePostEdit);
  var decks;
  var newDeckBtn = $("<button>");
  newDeckBtn.text("New Deck")
  newDeckBtn.addClass("new-deck btn btn-primary deck-btn");
  deckHeader.append("<span>Create a new deck: </span>", newDeckBtn);
  
    // This function grabs decks from the database and updates the view
    getDecks = () => {
        $.get("/api/decks", function(data) {
            console.log("Decks", data);
            decks = data;
            if (decks.length > 0) {
                initializeRows(decks);
            }

            else {
                displayEmpty();
            }
        });
    }
  
    // This function does an API call to delete decks
    deletePost = (id) => {
      $.ajax({
        method: "DELETE",
        url: "INSERT API route for decks/cards" + id
      })
        .then(function() {
          getDecks("select all unique decks (deckName) not all data by id (id)");
        });
    }
  
    // Getting the initial list of decks
    getDecks();
    // InitializeRows handles appending all of our constructed post HTML inside
    // deckContainer
    initializeRows = (decks) => {
      deckContainer.empty();
      var postsToAdd = [];
      for (var i = 0; i < decks.length; i++) {
        postsToAdd.push(createNewRow(decks[i]));
      }
      deckContainer.append(postsToAdd);
    }
  
    // This function constructs a post's HTML
    createNewRow = (post) => {
      console.log(post);
      console.log(post.deck_name);

      var newPostCard = $("<div>");
      newPostCard.addClass("card");
      var newPostCardHeading = $("<div>");
      newPostCardHeading.addClass("card-header");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger deck-btn");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-default deck-btn");
      var newPostTitle = $("<h2>");
      var newPostDate = $("<small>");
      var newPostCategory = $("<h5>");
      newPostCategory.text(post.category);
      newPostCategory.css({
        float: "right",
        "font-weight": "700",
        "margin-top":
        "-15px"
      });
      var newPostCardBody = $("<div>");
      newPostCardBody.addClass("card-body");
      var newPostBody = $("<p>");
      newPostTitle.text("Deck Name: " + post.deck_name);
      newPostBody.text(post.body);
      var formattedDate = new Date(post.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      newPostCardBody.text("Last edited: " + post.updatedAt );
      newPostTitle.append(newPostDate);
      newPostCardHeading.append(deleteBtn);
      newPostCardHeading.append(editBtn);
      newPostCardHeading.append(newPostTitle);
      newPostCardHeading.append(newPostCategory);
      newPostCardBody.append(newPostBody);
      newPostCard.append(newPostCardHeading);
      newPostCard.append(newPostCardBody);
      newPostCard.data("post", post);
      return newPostCard;
    }
  
    // This function figures out which post we want to delete and then calls
    // deletePost
    $(window).on("click", function(e){
      if (e.target.className.includes('delete')) {
        handlePostDelete();
      }
      else if (e.target.className.includes('edit')) {
        handlePostEdit();
      }
      else if (e.target.className.includes('new-deck')) {
        window.location.href = "/form";
      }
    });
    
    handlePostDelete = (e) => {
      var currentPost = $(this)
        .parent()
        .parent()
        .data("post");
        console.log(e);
      deletePost(currentPost.id);
    }
  
    // This function figures out which post we want to edit and takes it to the
    // Appropriate url
    handlePostEdit = () => {
      var currentPost = $(this)
        .parent()
        .parent()
        .data("post");
      window.location.href = "/cms?post_id=" + currentPost.id;
    }
    
    // This function displays a message when there are no decks
    displayEmpty = () => {
      deckContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("Uh oh! You have not created a deck yet! Click <a href='/form'>here</a> to create a new deck.");
      deckContainer.append(messageH2);
    }
  
  });
  