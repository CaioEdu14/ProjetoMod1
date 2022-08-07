window.onload = () => {
    updateData();
  };
  
  search = () => {
    if (document.getElementById("search").value != "") {
      console.log(document.getElementById("search").value);
      var items = JSON.parse(localStorage.getItem("items")).filter((item) =>
        item.title.includes(document.getElementById("search").value)
      );
  
      if (items.length > 0) {
        document.getElementById("content").innerHTML = "";
        items.forEach((item) => {
          createCard(item);
        });
      }
      var frontEnd = items.filter((item) => item.category == "FrontEnd").length;
      var backEnd = items.filter((item) => item.category == "BackEnd").length;
      var fullStack = items.filter((item) => item.category == "FullStack").length;
      var softSkill = items.filter((item) => item.category == "SoftSkill").length;
  
      document.getElementById("total-items").innerHTML = items.length;
      document.getElementById("total-front-end").innerHTML = frontEnd;
      document.getElementById("total-back-end").innerHTML = backEnd;
      document.getElementById("total-full-stack").innerHTML = fullStack;
      document.getElementById("total-soft-skill").innerHTML = softSkill;
    } else {
      updateData();
    }
  };
  
  clearForm = () => {
    document.getElementById("title").value = "";
    document.getElementById("skill").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
    document.getElementById("youtubeVideo").value = "";
  };
  
  updateData = () => {
    document.getElementById("content").innerHTML = "";
    var items = JSON.parse(localStorage.getItem("items"));
    if (items != null) {
      items.forEach((item) => {
        createCard(item);
      });
    }
    var frontEnd = items.filter((item) => item.category == "FrontEnd").length;
    var backEnd = items.filter((item) => item.category == "BackEnd").length;
    var fullStack = items.filter((item) => item.category == "FullStack").length;
    var softSkill = items.filter((item) => item.category == "SoftSkill").length;
  
    document.getElementById("total-items").innerHTML = items.length;
    document.getElementById("total-front-end").innerHTML = frontEnd;
    document.getElementById("total-back-end").innerHTML = backEnd;
    document.getElementById("total-full-stack").innerHTML = fullStack;
    document.getElementById("total-soft-skill").innerHTML = softSkill;
  };
  
  saveForm = () => {
    var postData = {
      id: Date.now(),
      title: document.getElementById("title").value,
      skill: document.getElementById("skill").value,
      category: document.getElementById("category").value,
      description: document.getElementById("description").value,
      youtubeVideo: document.getElementById("youtubeVideo").value,
    };
    console.log(postData);
    var items = JSON.parse(localStorage.getItem("items"));
    if (items == null) {
      items = [];
      items.push(postData);
    } else {
      items.push(postData);
    }
  
    localStorage.setItem("items", JSON.stringify(items));
    updateData();
    clearForm();
  };
  
  createCard = (postData) => {
    var contentDiv = document.getElementById("content");
    var contentCard = document.createElement("div");
    contentCard.className = "content-card";
    contentDiv.appendChild(contentCard);
    var contentCardTitle = document.createElement("div");
    contentCardTitle.className = "card-title";
    contentCardTitle.innerHTML = postData.title;
    contentCard.appendChild(contentCardTitle);
    var contentCardSkill = document.createElement("div");
    contentCardSkill.innerHTML = "<b>Lingugaem/Skill: </b>" + postData.skill;
    contentCard.appendChild(contentCardSkill);
    var contentCardCategory = document.createElement("div");
    contentCardCategory.innerHTML = "<b>Categoria: </b>" + postData.category;
    contentCard.appendChild(contentCardCategory);
    var contentCardDescription = document.createElement("div");
    contentCardDescription.className = "content-text";
    contentCardDescription.innerHTML = postData.description;
    contentCard.appendChild(contentCardDescription);
  
    var contentCardYoutube = document.createElement("div");
    contentCardYoutube.className = "content-youtube";
    contentCardYoutube.innerHTML =
      "<a href='" + postData.youtubeVideo + "' target='_blank'>Video</a>";
    contentCard.appendChild(contentCardYoutube);
  
    var contentCardEdit = document.createElement("div");
    contentCardEdit.className = "content-edit";
    contentCardEdit.innerHTML =
      "<button onclick=editForm('" + postData.id + "')>Edit</button>";
    contentCard.appendChild(contentCardEdit);
    var contentCardDelete = document.createElement("div");
    contentCardDelete.className = "content-delete";
    contentCardDelete.innerHTML =
      "<button onclick=deleteForm('" + postData.id + "')>Delete</button>";
    contentCard.appendChild(contentCardDelete);
  };
  
  editForm = (id) => {
    var items = JSON.parse(localStorage.getItem("items"));
    var item = items.find((item) => item.id == id);
    document.getElementById("title").value = item.title;
    document.getElementById("skill").value = item.skill;
    document.getElementById("category").value = item.category;
    document.getElementById("description").value = item.description;
    document.getElementById("youtubeVideo").value = item.youtubeVideo;
  };
  
  deleteForm = (id) => {
    var confirmDialog = confirm("Are you sure you want to delete this item?");
    if (confirmDialog) {
      var items = JSON.parse(localStorage.getItem("items"));
      var item = items.find((item) => item.id == id);
      console.log(item);
      console.log(title);
      items.splice(items.indexOf(item), 1);
      localStorage.setItem("items", JSON.stringify(items));
      updateData();
    }
  };
  