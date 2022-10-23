var keyV, nameV, emailV, URLV;

function readFom() {
  keyV = document.getElementById("key").value;
  nameV = document.getElementById("name").value;
  emailV = document.getElementById("email").value;
  URLV = document.getElementById("url").value;
  console.log(keyV, nameV, URLV, emailV);
}

document.getElementById("insert").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("Nota/" + keyV)
    .set({
      keyNo: keyV,
      name: nameV,
      email: emailV,
      url: URLV,
    });
  alert("Data Inserted");
  document.getElementById("key").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("url").value = "";
};

document.getElementById("read").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("Nota/" + keyV)
    .on("value", function (snap) {
      document.getElementById("key").value = snap.val().keyNo;
      document.getElementById("name").value = snap.val().name;
      document.getElementById("email").value = snap.val().email;
      document.getElementById("url").value = snap.val().url;
      document.getElementById("enlaceYt").src=snap.val().url; //+ "?start=45";
    });
};

document.getElementById("update").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("Nota/" + keyV)
    .update({
      name: nameV,
      email: emailV,
      url: URLV,
    });
  alert("Data Update");
  document.getElementById("key").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("url").value = "";
};

document.getElementById("delete").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("Nota/" + keyV)
    .remove();
  alert("Data Deleted");
  document.getElementById("key").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("url").value = "";
};
