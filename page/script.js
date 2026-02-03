document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const yourImages = [
        // IMPORTANT: Replace these with the actual paths to your images!
        // Example: 'images/photo1.jpg'
        'bilder/239E3A16-3AB4-45BE-B5FF-8CD08DAE40A0_1_105_c',
        'bilder/003B85B5-7EC2-4B06-A4E0-E7339BF52B5C_1_105_c.jpeg',
        'bilder/03674171-AA3D-4916-9F3A-91F842361FE7_1_105_c.jpeg',
        'bilder/14EA1C63-F4F6-432C-A5F5-216F7598A2DF_1_105_c.jpeg',
        'bilder/1C95C999-AC63-41E8-A080-70E0000C178D_1_105_c.jpeg',
        'bilder/1E66E913-C29C-43E7-9D89-361F6CD5C410_1_105_c.jpeg',
        'bilder/283AEDFB-51E6-4AEA-B8F4-88F9ADEBCE36_1_105_c.jpeg',
        'bilder/309275C7-1158-4DAD-B752-575B702DE879_1_105_c.jpeg',
        'bilder/362A8440-49C9-4B35-B603-473C39E6788F.jpeg',
        'bilder/37511468-F7BA-4198-B5D5-C363D54D139C_1_105_c.jpeg',
        'bilder/37BB3A08-6758-4317-828C-675B97AC2A3C_1_105_c.jpeg',
        'bilder/3A19874E-ABA3-4F7F-A70D-FBF48EBC6B6E_1_105_c.jpeg',
        'bilder/3D35F0F4-6D46-44F3-ACC9-668C5B51CD84_1_105_c.jpeg',
        'bilder/4976BDFB-A60F-4FC2-857B-CFA3AB9CBFB4_1_105_c.jpeg',
        'bilder/550E5A54-4D8F-4F89-B8CD-0C25E9998AAB_1_105_c.jpeg',
        'bilder/5F5B1822-5941-434F-A956-728946347751_1_105_c.jpeg',
        'bilder/648353E2-55E1-4A64-94A5-0158A10DA430_1_105_c.jpeg',
        'bilder/6DBD343E-1B39-4028-8005-BD25629449A1_1_105_c.jpeg',
        'bilder/8048DBBB-E659-4F14-BA18-7A9A264F828A_1_105_c.jpeg',
        'bilder/84F3B8DA-D89C-40D0-9DA4-C9332E21B5DD_1_201_a.heic',
        'bilder/87D1BBB7-2270-4415-B9AD-C836B3321EBE_1_105_c.jpeg',
        'bilder/8DC0192B-D3CE-4A24-89D9-A38E448E026D_1_105_c.jpeg',
        'bilder/8E88EA8A-5617-4A39-B814-A87182097CC8_1_105_c.jpeg',
        'bilder/904D81C7-F535-4CF7-900C-079EF55C98B4_1_105_c.jpeg',
        'bilder/9B379592-B79F-4CE0-A991-4E13B7EA6BDF_1_105_c.jpeg',
        'bilder/ABD29655-CCE8-4AFE-BC08-6EAF8075C87B_1_105_c.jpeg',
        'bilder/B26195CE-C85B-4CA8-9283-3192F7E96EAE_1_102_o.jpeg',
        'bilder/B4BA4F67-0395-49AB-A159-F5BF43244E34_1_105_c.jpeg',
        'bilder/C04C718A-20BE-47CB-B1FB-05C27A7BDF69_1_102_o.jpeg',
        'bilder/CA174D49-01B5-47E2-B188-1E59F1C05791_1_102_o.jpeg',
        'bilder/CD09966E-CB7F-46BC-A8B2-816DFF4F9033_1_105_c.jpeg',
        'bilder/CD31A9F3-BB98-46CB-BEA9-C1EDB9CD9EC8_1_105_c.jpeg',
        'bilder/CD6B2C89-8349-40BD-9267-4044BB73C32D_1_105_c.jpeg',
        'bilder/CFF00FEF-DA46-46A5-9E1C-57F8C4574275_1_105_c.jpeg',
        'bilder/D015092B-669D-4B62-A0DA-708A67A1A9B7_1_105_c.jpeg',
        'bilder/D3F0181B-E9A9-43A0-A81A-40D2C08AD313_1_105_c.jpeg',
        'bilder/D698B4A8-89B4-45F8-B012-E26193EB5FE4_1_102_o.jpeg',
        'bilder/E4975C6E-1CEE-437E-BA8D-AC02C4E4DAC6.jpeg',
        'bilder/E8A436E8-FD45-40C4-BCD5-9D396FDE9F72_1_105_c.jpeg',
        'bilder/F148DDC1-DE25-40E7-BEAA-F1D01D7D0CED_1_105_c.jpeg',
        'bilder/B42D3240-AEBD-4C24-96FB-F3CFE396C899_1_102_a.jpeg',
        'bilder/14099E7B-5E11-4C1D-A399-85826FE6A220_1_105_c.jpeg',
        'bilder/3B54181C-B86E-409F-976D-3CB16CE2B0B8_1_105_c.jpeg', // This will be the final image
    ];
    // --- END CONFIGURATION ---

    const progress = document.getElementById('progress');
    const scanComplete = document.getElementById('scan-complete');
    const virusSection = document.getElementById('virus-section');
    const cardSection = document.getElementById('card-section');

    // 1. Animate the progress bar
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            scanComplete.style.display = 'block';
            // Wait a bit, then switch to the card
            setTimeout(() => {
                virusSection.style.display = 'none';
                cardSection.style.display = 'flex';
                cardSection.style.flexDirection = 'column';
                startSlideshow();
            }, 2000);
        } else {
            width++;
            progress.style.width = width + '%';
        }
    }, 30); // Speed of the progress bar

    // 2. Image Slideshow Logic
    const imageContainer = document.getElementById('image-container');
    let currentImageIndex = 0;
    let slideshowInterval;
    let slideshowSpeed = 1500; // Time in ms for each image

    // Preload images and add them to the DOM
    yourImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        if (index === 0) {
            img.classList.add('active'); // Show the first image
        }
        imageContainer.appendChild(img);
    });

    const images = imageContainer.getElementsByTagName('img');

    function startSlideshow() {
        slideshowInterval = setInterval(() => {
            images[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            images[currentImageIndex].classList.add('active');
        }, slideshowSpeed);
    }

    // 3. Button Logic
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const titleYayy = document.getElementById('title-yayy');
    const titleQuestion = document.getElementById('titleQuestion');
    const question = document.getElementById('question');
    const text = document.getElementById('text');

    // "No" button runs away
    noBtn.addEventListener('mouseover', () => {
        // Get the dimensions of the button and its container
        const containerRect = noBtn.parentElement.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        let newTop = Math.random() * ((containerRect.height - btnRect.height)*5);
        let newLeft = Math.random() * ((containerRect.width - btnRect.width)*5);

        // Make sure the button doesn't overlap with the 'Yes' button area
        if (newLeft < yesBtn.offsetWidth + 20) {
            newLeft += yesBtn.offsetWidth + 20;
        }

        noBtn.style.top = newTop + 'px';
        noBtn.style.left = newLeft + 'px';
    });

    // "Yes" button logic
    yesBtn.addEventListener('click', () => {
        clearInterval(slideshowInterval); // Stop the fast slideshow

        // Slow down the slideshow
        slideshowSpeed = 2500000000; // A much slower speed
        slideshowInterval = setInterval(() => {
            images[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            images[currentImageIndex].classList.add('active');
            
            // If it's the last image, stop the slideshow
            if (currentImageIndex === images.length - 1) {
                clearInterval(slideshowInterval);
                // Make the 'No' button disappear
                noBtn.style.display = 'none';
                yesBtn.style.display ='none';
                titleYayy.style.display = 'block';
                titleQuestion.style.display = 'none';
                question.style.display = 'none';
                text.style.display = 'block';
            }
        }, slideshowSpeed);
    });
});