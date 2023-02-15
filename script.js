"use strict";

const allStudents = [];
const Student = {
  firstName: null,
  lastName: null,
  middleName: null,
  nickName: null,
  image: null,
  house: null,
};

async function getData() {
  const response = await fetch(
    "https://petlatkea.dk/2021/hogwarts/students.json"
  );
  const data = await response.json();
  console.log(data);
  prepareObjects(data);
  console.table(allStudents);
}

getData();

function prepareObjects(data) {
  data.forEach((jsonObject) => {
    const student = Object.create(Student);

    const nameArray = jsonObject.fullname.trim().split(" ");
    let firstName, middleName, lastName, nickName;
    const nickNameIndex = nameArray.findIndex((name, index) => {
      return name.startsWith('"') && name.endsWith('"');
    });
    if (nickNameIndex !== -1) {
      nickName = nameArray[nickNameIndex].replaceAll(`"`, "");
      nickName =
        nickName.charAt(0).toUpperCase() + nickName.slice(1).toLowerCase();
      nameArray.splice(nickNameIndex, 1);
    }
    if (nameArray.length === 1) {
      firstName = nameArray[0];
    } else if (nameArray.length === 2) {
      firstName = nameArray[0];
      lastName = nameArray[1];
    } else {
      firstName = nameArray[0];
      middleName = nameArray.slice(1, -1).join(" ");
      lastName = nameArray[nameArray.length - 1];
    }

    console.log(nickNameIndex);

    if (lastName) {
      student.lastName =
        lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    }

    student.firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

    if (middleName) {
      student.middleName =
        middleName.charAt(0).toUpperCase() + middleName.slice(1).toLowerCase();
    }
    if (nickName) {
      student.nickName =
        nickName.charAt(0).toUpperCase() + nickName.slice(1).toLowerCase();
    }

    student.imgSrc = `./images/${firstName
      .substring(0, firstName.indexOf(" "))
      .toLowerCase()}_.png`;
    student.imgSrc = `./images/${
      firstName
        .substring(
          firstName.lastIndexOf(" ") + 1,
          firstName.lastIndexOf(" ") + 2
        )
        .toLowerCase() +
      firstName.substring(firstName.lastIndexOf(" ") + 2).toLowerCase()
    }_${firstName.substring(0, 1).toUpperCase().toLowerCase()}.png`;
    student.house =
      jsonObject.house.trim().charAt(0).toUpperCase() +
      jsonObject.house.trim().slice(1).toLowerCase();
    allStudents.push(student);
  });
}
