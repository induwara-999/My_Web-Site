// අපේක්ෂිත නිවැරදි Email ලිපිනය
const CORRECT_EMAIL = "b5kdiamondstore@gmail.com";

// Login බොත්තම ක්ලික් කළ විට
function handleLoginClick(event) {
    event.preventDefault(); 
    
    // State එක Save කිරීම: "Login Button එක Click කළා"
    localStorage.setItem('login_clicked', 'true');
    
    // අර site එකට redirect කිරීම
    window.location.href = "https://tharustore.com"; 
}

// Logout Button ක්ලික් කළ විට
function handleLogout() {
    // සියලුම State Flags ඉවත් කරයි
    localStorage.removeItem('login_clicked');
    localStorage.removeItem('verification_complete');
    
    // පිටුව නැවත Load කරයි (ආරම්භක තත්ත්වයට පැමිණීමට)
    window.location.reload(); 
}

// Verification Logic
function verifyEmail() {
    // අවශ්‍ය සියලුම HTML Elements ලබා ගැනීම
    const emailInput = document.getElementById('email-input').value.trim();
    const messageElement = document.getElementById('verification-message');
    const successMessageDiv = document.getElementById('success-message');
    const verificationSection = document.getElementById('verification-section');
    const loginButton = document.getElementById('login-button');
    const activeDot = document.getElementById('active-dot');
    const logoutButton = document.getElementById('logout-button');

    if (emailInput === CORRECT_EMAIL) {
        // Verification සාර්ථක වූ විට
        
        verificationSection.style.display = 'none';
        messageElement.textContent = ''; // Error message එක ඉවත් කරයි
        
        successMessageDiv.style.display = 'block';
        successMessageDiv.textContent = "Verification Successful! ✅";
        
        // තත්පර 3 කට පසු, අනෙකුත් elements පෙන්වීමට/සැඟවීමට
        setTimeout(() => {
            successMessageDiv.style.display = 'none'; // Message එක සඟවයි

            // Login Button ඉවත් කර Dot/Logout Button පෙන්වයි
            loginButton.style.display = 'none'; 
            activeDot.style.display = 'block';
            activeDot.classList.add('blinking');
            logoutButton.style.display = 'inline-block';
            
            // Verification සම්පූර්ණ බව Save කිරීම
            localStorage.setItem('verification_complete', 'true');
            localStorage.removeItem('login_clicked');

        }, 3000); // 3000ms = තත්පර 3

    } else {
        // Email එක වැරදි නම් පෙන්වන Message එක
        messageElement.style.color = 'red';
        messageElement.textContent = "Incorrect Email Address";
    }
}

// Page එක Load වූ පසු තත්ත්වය පරීක්ෂා කිරීම (State Management)
function checkLoginState() {
    const loginButtonClicked = localStorage.getItem('login_clicked');
    const verificationComplete = localStorage.getItem('verification_complete');
    const loginButton = document.getElementById('login-button');
    const verificationSection = document.getElementById('verification-section');
    const activeDot = document.getElementById('active-dot');
    const logoutButton = document.getElementById('logout-button');

    if (verificationComplete === 'true') {
        // Verification සම්පූර්ණයි: Green Dot සහ Logout Button පෙන්වයි
        loginButton.style.display = 'none';
        verificationSection.style.display = 'none';
        activeDot.style.display = 'block';
        activeDot.classList.add('blinking');
        logoutButton.style.display = 'inline-block';
        
    } else if (loginButtonClicked === 'true') {
        // Login Click කර Back ආවා: Verification Form එක පෙන්වයි
        loginButton.style.display = 'none';
        verificationSection.style.display = 'block';
        activeDot.style.display = 'none';
        logoutButton.style.display = 'none';
        
    } else {
        // සාමාන්‍ය තත්ත්වය: Login බොත්තම පමණක් පෙන්වයි
        loginButton.style.display = 'inline-block';
        verificationSection.style.display = 'none';
        activeDot.style.display = 'none';
        logoutButton.style.display = 'none';
    }
}

// Page එක Load වූ වහාම මෙම function එක ක්‍රියාත්මක වේ
window.onload = checkLoginState;
