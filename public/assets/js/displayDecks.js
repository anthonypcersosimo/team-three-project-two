$(document).ready(function() {
    // deckContainer holds all of our decks
    var deckContainer = $(".deck-container");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);
    var decks;
  
    // This function grabs decks from the database and updates the view
    getDecks = () => {
        $.get("INSERT API route for decks/cards", function(data) {
            console.log("Decks", data);
            decks = data;
            console.log(decks)
            // if ("database has data...") {
            //     initializeRows();
            // }

            // else {
            //     displayEmpty();
            // }
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
    initializeRows = () => {
      deckContainer.empty();
      var postsToAdd = [];
      for (var i = 0; i < decks.length; i++) {
        postsToAdd.push(createNewRow(decks[i]));
      }
      deckContainer.append(postsToAdd);
    }
  
    // This function constructs a post's HTML
    createNewRow = (post) => {
      var newPostCard = $("<div>");
      newPostCard.addClass("card");
      var newPostCardHeading = $("<div>");
      newPostCardHeading.addClass("card-header");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-default");
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
      newPostTitle.text(post.title + " ");
      newPostBody.text(post.body);
      var formattedDate = new Date(post.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      newPostDate.text(formattedDate);
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
    handlePostDelete = () => {
      var currentPost = $(this)
        .parent()
        .parent()
        .data("post");
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
      messageH2.html("No decks yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");
      deckContainer.append(messageH2);
    }
  
  });
  