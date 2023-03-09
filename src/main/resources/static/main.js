const URL = "/api/users";

$(document).ready(function () {
    getUsers();
})

function getUsers() {
    fetch(URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (users) {
            let placeholder = document.getElementById('data_output');
            let out = "";
            for (let user of users) {
                out += '<tr>';
                out += '<td>' + user.id + '</td>';
                out += '<td>' + user.username + '</td>';
                out += '<td>' + user.surname + '</td>';
                out += '<td>' + user.age + '</td>';
                out += '<td>' + user.job + '</td>';

                let i, role = "";
                for (i in user.roles) {
                    if (user.roles[i].role === "ROLE_USER") {
                        role = "USER";
                    } else {
                        role = "ADMIN";
                    }
                    if (user.roles.length === 1) {
                        out += "<td>" + role + "</td>";
                    } else if (i == 0) {
                        out += "<td>" + role + ", ";
                    } else {
                        out += role + "</td>";
                    }
                }
                out += '<td>' +
                    '<button type="button" class="btn btn-info" data-bs-target="#editModal" data-bs-toggle="modal" ' +
                    'onclick="getEditModal(' + user.id + ')">' + 'Edit' +
                    '</button>' +
                    '</td>';
                out += '<td>' +
                    '<button type="button" class="btn btn-danger" data-bs-target="#deleteModal" data-bs-toggle="modal" ' +
                    'onclick="getDeleteModal(' + user.id + ')">' + 'Delete' +
                    '</button>' +
                    '</td>';
                out += '</tr>';
            }

            placeholder.innerHTML = out;
        });
}

function getEditModal(id) {
    fetch(URL + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json()
            .then(userEdit => {
                document.getElementById('edit_id').value = userEdit.id;
                document.getElementById('edit_username').value = userEdit.username;
                document.getElementById('edit_surname').value = userEdit.surname;
                document.getElementById('edit_age').value = userEdit.age;
                document.getElementById('edit_job').value = userEdit.job;
                document.getElementById('edit_password').value = userEdit.password;
                document.getElementById('edit_role').value = userEdit.roles;

                const select = document.querySelector('#edit_role').getElementsByTagName('option');

                for (let i = 0; i < select.length; i++) {
                    if (select[i].value === userEdit.roles[i].role) {
                        select[i].selected = true;
                        if (i === select.length - 1) {
                            break;
                        }
                    } else if (select[i + 1].value === userEdit.roles[i].role) {
                        select[i + 1].selected = true;
                    }
                }
            })
    });
}

function editUser() {
    event.preventDefault();
    let id = document.getElementById('edit_id').value;
    let username = document.getElementById('edit_username').value;
    let surname = document.getElementById('edit_surname').value;
    let age = document.getElementById('edit_age').value;
    let job = document.getElementById('edit_job').value;
    let password = document.getElementById('edit_password').value;
    let roles = $("#edit_role").val()

    for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'ROLE_ADMIN') {
            roles[i] = {
                'id': 2,
                'role': 'ROLE_ADMIN',
                "authority": "ROLE_ADMIN"
            }
        }
        if (roles[i] === 'ROLE_USER') {
            roles[i] = {
                'id': 1,
                'role': 'ROLE_USER',
                "authority": "ROLE_USER"
            }
        }
    }

    fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            'id': id,
            'username': username,
            'surname': surname,
            'age': age,
            'job': job,
            'password': password,
            'roles': roles
        })
    })
        .then(() => {
            $('#editModal').modal('hide');
            getUsers();
        })
}

function getDeleteModal(id) {
    fetch(URL + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(userDelete => {
            document.getElementById('delete_id').value = userDelete.id;
            document.getElementById('delete_username').value = userDelete.username;
            document.getElementById('delete_surname').value = userDelete.surname;
            document.getElementById('delete_age').value = userDelete.age;
            document.getElementById('delete_job').value = userDelete.job;
            document.getElementById('delete_password').value = userDelete.password;
            document.getElementById('delete_role').value = userDelete.roles;
        })
    });
}

function deleteUser() {
    event.preventDefault();
    let id = document.getElementById('delete_id').value;

    fetch(URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },

    })
        .then(() => {
            $('#deleteModal').modal('hide');
            getUsers();
        })
}

function addUser() {
    event.preventDefault();
    let username = document.getElementById('create_username').value;
    let surname = document.getElementById('create_surname').value;
    let age = document.getElementById('create_age').value;
    let job = document.getElementById('create_job').value;
    let password = document.getElementById('create_password').value;
    let roles = $("#create_role").val()

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            'username': username,
            'surname': surname,
            'age': age,
            'job': job,
            'password': password,
            'roles': roles
        })
    })
        .then(() => {
            document.getElementById('nav-users_table-tab').click()
            getUsers()
            document.newUserForm.reset()
        })

}


/*  Методы вставки:
         const textElement = document.getElementById('admin_table');
         const newElement = document.createElement('div');
         newElement.innerHTML = `Some text <span class="yellow">yellow text</span>another text!`;

         Вставка:
            1. Перед обектом -> textElement.before(newElement);
            2. После -> after
            3. Внутрь и в начало объекта -> prepend
            4. Внутрь в конец -> append

         Альтернатива вставки текста, HTML, элемента:
               textElement.insertAdjacentHTML(
                   'afterend',
                   `<p>Some text</p>`
               );
               (beforebegin, afterbegin, beforeend, afterend)



        Работа с link и input:

            const link = document.querySelector('.lesson_link');
            const input = document.querySelector('.lesson_input');

            console.log(link.href);
            console.log(input.value);
            */


/* jQuery
* $(document).ready(function() {
*       пишем на jQuery
* })
*
* Получить эл-т на странице
*  $('#admin_table') - получим селектор по id
*
* AJAX запросы
*   $.ajax({
*       type: "method",'
*       url: "url",
*       data: "data",
*       dataType: "dataType",
*       success: function (response) {
*           //Обрабатываем ответ
*       }
*   });
* */
