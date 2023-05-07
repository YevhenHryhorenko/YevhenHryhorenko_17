const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "JackSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "AmalSmith",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "NoahSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "CharlieSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}
		]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "EmilySmith",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];

class User {
	constructor(name, age, img, role, courses) {
		this.name = name
		this.age = age
		this.img = img
		this.role = role
		this.courses = courses
		document.querySelector(".users").insertAdjacentHTML("beforeend", `
		<div class="user">
			<div class="user__info"></div>
			<div class="user__courses"></div>
		</div>`)
		this.userInfo = document.querySelectorAll(".user__info")
		this.userCourses = document.querySelectorAll(".user__courses")
		this.render(this.userInfo[this.userInfo.length - 1])
		this.renderCourses(this.userCourses[this.userCourses.length - 1])
	}

	render(user) {
		this.insertInfoData(user)
		this.insertInfoRole(user)
	}

	insertInfoData(user) {
		const templateInfoData = `
			<div class="user__info--data">
				<img src="images/users/${this.img}.png" alt="${this.name}" height="50">
				<div class="user__naming">
					<p>Name: <b>${this.name}</b></p>
					<p>Age: <b>${this.age}</b></p>
				</div>
			</div>
		`
		user.insertAdjacentHTML("beforeend", templateInfoData)
	}

	insertInfoRole(user) {
		const templateInfoRole = `
		<div class="user__info--role ${this.role}">
			<img src="images/roles/${this.role}.png" alt="${this.role}" height="25">
			<p>${this.role}</p>
		</div>`
		user.insertAdjacentHTML("beforeend", templateInfoRole)
	}

	renderCourses(user) {
		const marks = Object.entries(gradation)

		if (this.courses) {
			const courses = this.courses.map(item => {
				for (let i = 1; i < marks.length; i++) {
					if ((marks[i - 1][0] <= item.mark && item.mark <= marks[i][0]) || item.mark < marks[0][0]) {
						return `<p class="user__courses--course ${this.role}">${item.title} <span class="${item.mark < marks[0][0] ? marks[0][1] : marks[i][1]}">${item.mark < marks[0][0] ? marks[0][1] : marks[i][1]}</span></p>`
					}
				}
			}).join('')
			
			user.insertAdjacentHTML("beforeend", courses)
		}
	}
}

class Student extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	}
}

class Admin extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
		this.userCourses[this.userCourses.length - 1].classList.add('admin--info')
	}

	renderCourses(user) {
		const marks = Object.entries(gradation)

		if (this.courses) {
			const courses = this.courses.map(item => {
				for (let i = 1; i < marks.length; i++) {
					if ((marks[i - 1][0] <= item.score && item.score <= marks[i][0]) || item.score < marks[0][0]) {
						console.log(marks[0][0],item.score, marks[i][1], marks[0][1]);
						return `
						<div class="user__courses--course admin">
							<p>Title: <b>${item.title}</b></p>
							<p>Admin's score: <span class="${item.score < marks[0][0] ? marks[0][1] : marks[i][1]}">${item.score < marks[0][0] ? marks[0][1] : marks[i][1]}</span></p>
							<p>Lector: <b>${item.lector}</b></p>
						</div>`
					}
				}
			}).join('')
			
			user.insertAdjacentHTML("beforeend", courses)
		}
	}
}

class Lector extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
		this.userCourses[this.userCourses.length - 1].classList.add('admin--info')
	}

	renderCourses(user) {
		const marks = Object.entries(gradation)

		if (this.courses) {
			const userCourses = this.userCourses[this.userCourses.length - 1]
			const courses = this.courses.map((item, index) => {
				userCourses.insertAdjacentHTML("beforeend", `
					<div class="user__courses--course lector">
					<p>Title: <b>${item.title}</b></p>
				</div>`)
				for (let i = 1; i < marks.length; i++) {
					if (((marks[i - 1][0] <= item.score && item.score <= marks[i][0])) || (item.score < marks[0][0])) {
						console.log(index);
						console.log(index, marks[i][0], marks[i][1], item.score);
						userCourses.querySelectorAll(".user__courses--course.lector")[index].insertAdjacentHTML("beforeend", `<p>Lector's score: <span class="${item.score < marks[0][0] ? marks[0][1] : marks[i][1]}">${item.score < marks[0][0] ? marks[0][1] : marks[i][1]}</span></p>`)
					}
					if (((marks[i - 1][0] <= item.studentsScore && item.studentsScore <= marks[i][0])) || (item.studentsScore < marks[0][0])) {
						userCourses.querySelectorAll(".user__courses--course.lector")[index].insertAdjacentHTML("beforeend", `<p>Average student's score: <span class="${item.studentsScore < marks[0][0] ? marks[0][1] : marks[i][1]}">${item.studentsScore < marks[0][0] ? marks[0][1] : marks[i][1]}</span></p>`)
						return
					}
				}
				console.log(userCourses.querySelectorAll(".user__courses--course.lector"));
			}).join('')
			
		}
	}
}

users.forEach(user => {
	if (user.role == 'student') {
		new Student(user.name, user.age, user.img, user.role, user.courses)
	} else if (user.role == 'admin') {
		new Admin(user.name, user.age, user.img, user.role, user.courses)
	} else if (user.role == 'lector') {
		new Lector(user.name, user.age, user.img, user.role, user.courses)
	}
})
