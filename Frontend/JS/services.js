// Define content for each page
const pages = {
    addAdmin: `
        <form>
            <div class="mb-3">
                <label for="FirstName" class="form-label">First name</label>
                <input type="text" class="form-control" id="FirstName" required>
            </div>
            <div class="mb-3">
                <label for="SecondName" class="form-label">Second name</label>
                <input type="text" class="form-control" id="SecondName" required>
            </div>
            <div class="mb-3">
                <label for="ThirdName" class="form-label">Third name</label>
                <input type="text" class="form-control" id="ThirdName" required>
            </div>
            <div class="mb-3">
                <label for="ForthName" class="form-label">Forth name</label>
                <input type="text" class="form-control" id="ForthName" required>
            </div>
            <div class="mb-3">
                <label for="FullName" class="form-label">Full name</label>
                <input type="text" class="form-control" id="FullName">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" required>
            </div>
            </div>
            <div class="mb-3">
            <label for="age" class="form-label">Age</label>
            <input type="number" class="form-control" id="age">
            </div>
            <div class="mb-3">
            <label for="phone" class="form-label">Phone number</label>
            <input type="number" class="form-control" id="phone">
            </div>
            <div class="mb-3">
            <label for="SSN" class="form-label">SSN</label>
            <input type="number" class="form-control" id="SSN">
            </div>
            <div class="mb-3">
                <label for="gender" class="form-label">Gender</label>
                <input type="text" class="form-control" id="gender" >
            </div>
            <div class="mb-3">
            
            <div class="form-check">
            <input class="form-check-input" type="radio" value="supervisor" name="role""  id="role">
            <label class="form-check-label" for="role">
                Supervisor
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" value="admin" name="role" id="admin" checked>
            <label class="form-check-label" for="admin">
                Admin
            </label>
            </div>
            </div>
            <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            `,
        addFamily: `
           <div class="mb-3">
                <label for="FamilyName" class="form-label">Family name</label>
                <input type="text" class="form-control" id="FamilyName" required>
            </div>
            <div class="mb-3">
                <label for="comment" class="form-label">Comment</label>
                <input type="text" class="form-control" id="comment" required>
            </div>

    `,
    addUser: `
    <form>
            <div class="mb-3">
                <label for="FirstName" class="form-label">First name</label>
                <input type="text" class="form-control" id="FirstName" required>
            </div>
            <div class="mb-3">
                <label for="SecondName" class="form-label">Second name</label>
                <input type="text" class="form-control" id="SecondName" required>
            </div>
            <div class="mb-3">
                <label for="ThirdName" class="form-label">Third name</label>
                <input type="text" class="form-control" id="ThirdName" required>
            </div>
            <div class="mb-3">
                <label for="ForthName" class="form-label">Forth name</label>
                <input type="text" class="form-control" id="ForthName" required>
            </div>
            <div class="mb-3">
                <label for="FullName" class="form-label">Full name</label>
                <input type="text" class="form-control" id="FullName">
            </div>
            <div class="mb-3">
                <label for="age" class="form-label">Age</label>
                <input type="number" class="form-control" id="age">
            </div>
            <div class="mb-3">
                <label for="SSN" class="form-label">SSN</label>
                <input type="number" class="form-control" id="SSN">
            </div>
            <div class="mb-3">
                <label for="gender" class="form-label">Gender</label>
                <input type="text" class="form-control" id="gender" >
            </div>
            <div class="mb-3">
                <label for="familyId" class="form-label">Family Id</label>
                <input type="number" class="form-control" id="familyId" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
    `,
    addRcs: `
        <div class="mb-3">
            <label for="Name" class="form-label">Name</label>
            <input type="text" class="form-control" id="Name" required>
        </div>
            
    `,
    addVol: `
                <form>
            <div class="mb-3">
                <label for="FirstName" class="form-label">First name</label>
                <input type="text" class="form-control" id="FirstName" required>
            </div>
            <div class="mb-3">
                <label for="SecondName" class="form-label">Second name</label>
                <input type="text" class="form-control" id="SecondName" required>
            </div>
            <div class="mb-3">
                <label for="ThirdName" class="form-label">Third name</label>
                <input type="text" class="form-control" id="ThirdName" required>
            </div>
            <div class="mb-3">
                <label for="ForthName" class="form-label">Forth name</label>
                <input type="text" class="form-control" id="ForthName" required>
            </div>
            <div class="mb-3">
                <label for="FullName" class="form-label">Full name</label>
                <input type="text" class="form-control" id="FullName">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" required>
            </div>
            </div>
            <div class="mb-3">
            <label for="age" class="form-label">Age</label>
            <input type="number" class="form-control" id="age">
            </div>
            <div class="mb-3">
            <label for="phone" class="form-label">Phone number</label>
            <input type="number" class="form-control" id="phone">
            </div>
            <div class="mb-3">
            <label for="SSN" class="form-label">SSN</label>
            <input type="number" class="form-control" id="SSN">
            </div>
            <div class="mb-3">
                <label for="gender" class="form-label">Gender</label>
                <input type="text" class="form-control" id="gender" >
            </div>
            
            <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
    `
};

// Function to load content based on the selected page
function loadPage(page) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = pages[page] || pages.addAdmin;
    
    // Update the active class in the sidebar
    document.querySelectorAll('#sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
}

// Add event listeners to navigation links
document.addEventListener('DOMContentLoaded', () => {
    loadPage('addAdmin'); // Load default page

    document.querySelectorAll('#sidebar .nav-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadPage(page);
        });
    });
});
