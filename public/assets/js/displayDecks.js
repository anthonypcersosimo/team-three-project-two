$(document).ready(function () {

  const getCategories = () => {
    $.get('/api/decks', decks => {
      const distinctCategories = [...new Set(decks.map(deck => deck.category))]
      console.log(distinctCategories);
      renderCategoryDD(distinctCategories)
    })
  }
  getCategories();
  // deckContainer holds all of our decks
  var deckContainer = $(".deck-container");
  // var deckHeader = $("#deck-header");
  // Click events for the edit and delete buttons
  // $(document).on("click", "button.delete", handlePostDelete);
  // $(document).on("click", "button.edit", handlePostEdit);


  // var decks;
  // var newDeckBtn = $("<button>");
  // newDeckBtn.text("New Deck")
  // newDeckBtn.addClass("new-deck btn btn-primary deck-btn");
  // deckHeader.append("<span>Create a new deck: </span>", newDeckBtn);

  // This function grabs decks from the database and updates the view
  // catparam is the category parameter, if it is passed to the get decks fn (from the categories dd) only the decks from that category will be displayed
  getDecks = (catParam) => {

    if (catParam) {
      route = "/api/decks/" + catParam;
    } else {
      route = "/api/decks"
    }

    $.get(route, function (data) {
      console.log("Decks", data);
      decks = data;
      if (decks.length > 0) {
        initializeRows(decks);
        $("#filter-dd").removeClass("hidden");
      }

      else {
        displayEmpty();
      }
    });
  };



  // render categories uses the new Set functionality from es6 to return only the distinct category values from the array of decks
  const renderCategoryDD = distinctCategories => {
    $("#category-dd").empty();
    // const distinctCategories = [...new Set(decks.map(deck => deck.category))]
    // console.log(distinctCategories);
    let noFilterLink = `<a class="dropdown-item" id="no-filter-link" href="">None</a>`;
    $("#category-dd").append(noFilterLink)
    distinctCategories.forEach(category => {
      let newDDLink = $("<a>")
      newDDLink.addClass("dropdown-item")
      newDDLink.addClass("category-link")
      newDDLink.text(category)
      // let newDDLink = $(`<a class="dropdown-item" href="">${category}</a>;`)
      newDDLink.data("category", category);
      $("#category-dd").append(newDDLink)
    })
  }


  // This function does an API call to delete decks
  deletePost = (id) => {
    $.ajax({
      method: "DELETE",
      url: "api/decks/" + id
    })
      .then(function () {
        getDecks();
      });
  };

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
  };

  // This function constructs a post's HTML
  createNewRow = (post) => {
    console.log(post);

    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    newPostCard.attr("id", post.id);
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    newPostCardHeading.attr("id", post.id);
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger deck-btn");
    deleteBtn.attr("id", post.id);
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default deck-btn");
    editBtn.attr("id", post.id);
    var studyBtn = $("<button>");
    studyBtn.text("STUDY");
    studyBtn.addClass("study btn btn-warning deck-btn");
    studyBtn.attr("id", post.id);
    var newPostTitle = $(`<h2>`);
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
    newPostCardBody.attr("id", post.id);
    var newPostBody = $("<p>");
    newPostTitle.text("Deck Name: " + post.deck_name);
    newPostBody.text(post.body);
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostCardBody.text("Last edited: " + post.updatedAt);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(studyBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  };

  // This function figures out which post we want to delete and then calls
  // deletePost
  $(window).on("click", function (e) {
    if (e.target.className.includes('delete')) {
      handlePostDelete(e.target);
    }
    else if (e.target.className.includes('edit')) {

      handlePostEdit(e.target)
    }
    else if (e.target.className.includes('new-deck')) {
      window.location.href = "/form";
    }
    else if (e.target.className.includes('study')) {
      let deckId = e.target.id
      window.location.href = '/card?deck_id=' + deckId;
    }
  });

  $(document).on("click", ".category-link", function () {
    let category = $(this).data("category")
    console.log(category)
    getDecks(category)
  });
  $(document).on("click", "#no-filter-link", function () {
    getDecks(category)
  });


  // $(document).on("click", ".card", function () {
  //   deckId = $(this).parent().data("id");
  //   console.log(deckId)
  // })

  handlePostDelete = (e) => {
    var target = e.id;
    deletePost(target);
  }

  const handlePostEdit = e => {
    let target = e.id
    console.log(target)
    window.location.href = "/form?deck_id=" + target;
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
