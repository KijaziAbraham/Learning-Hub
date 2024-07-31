document.addEventListener("DOMContentLoaded", function () {
  
/*--------------------------------------------------------------
# Form validation
--------------------------------------------------------------*/
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", function (event) {
      const inputs = form.querySelectorAll("input[required]");
      let valid = true;
      inputs.forEach(input => {
        if (!input.value) {
          valid = false;
          input.classList.add("invalid");
        } else {
          input.classList.remove("invalid");
        }
      });
      if (!valid) {
        event.preventDefault();
        alert("Please fill in all required fields.");
      }
    });
  });

/*--------------------------------------------------------------
# Back to top button functionality 
--------------------------------------------------------------*/
  
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });
  }
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

/*--------------------------------------------------------------
# Alert Timeout
--------------------------------------------------------------*/
  document.querySelectorAll('.alert').forEach(alert => {
    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000);
  });

/*--------------------------------------------------------------
# modal Event Listener
--------------------------------------------------------------*/
  const approveModal = document.getElementById('approveModal');
  if (approveModal) {
    approveModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget;
      const channelId = button.getAttribute('data-channel-id');
      const channelName = button.getAttribute('data-channel-name');
      const channelDescription = button.getAttribute('data-channel-description');
      const channelOwner = button.getAttribute('data-channel-owner');

      document.getElementById('modalChannelName').textContent = channelName;
      document.getElementById('modalChannelDescription').textContent = channelDescription;
      document.getElementById('modalChannelOwner').textContent = channelOwner;
      document.getElementById('modalChannelId').value = channelId;
    });
  }

  const descriptionModal = document.getElementById('descriptionModal');
  if (descriptionModal) {
    descriptionModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget;
      const channelDescription = button.getAttribute('data-channel-description');

      document.getElementById('fullChannelDescription').textContent = channelDescription;
    });
  }

/*--------------------------------------------------------------
# side bar nav function
--------------------------------------------------------------*/
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const elements = select(el, all);
    elements.forEach(e => e.addEventListener(type, listener));
  };

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

/*--------------------------------------------------------------
# toggle side bar
--------------------------------------------------------------*/
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', () => {
      document.body.classList.toggle('toggle-sidebar');
    });
  }
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

/*--------------------------------------------------------------
# search bar toogle
--------------------------------------------------------------*/
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', () => {
      select('.search-bar').classList.toggle('search-bar-show');
    });
  }
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }
/*--------------------------------------------------------------
#   Navbar Links Active State on Scroll 
--------------------------------------------------------------*/
 
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

/*--------------------------------------------------------------
# Header scroll bar class
--------------------------------------------------------------*/
  let selectHeader = select('#header');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

/*--------------------------------------------------------------
# initialize tooltp
--------------------------------------------------------------*/
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

/*--------------------------------------------------------------
# initialize Quill
--------------------------------------------------------------*/
  const quillOptions = {
    theme: 'snow'
  };
  if (select('.quill-editor-default')) new Quill('.quill-editor-default', quillOptions);
  if (select('.quill-editor-bubble')) quillOptions.theme = 'bubble', new Quill('.quill-editor-bubble', quillOptions);
  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{ font: [] }, { size: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "super" }, { script: "sub" }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["direction", { align: [] }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }
/*--------------------------------------------------------------
#  TinyMCE Editor 
--------------------------------------------------------------*/
  
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [
      { title: 'My page 1', value: 'https://www.tiny.cloud' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_list: [
      { title: 'My page 1', value: 'https://www.tiny.cloud' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_class_list: [
      { title: 'None', value: '' },
      { title: 'Some class', value: 'class-name' }
    ],
    importcss_append: true,
    height: 400,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
      }
    },
    templates: [
      { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td> <p>Your content here</p></td></tr></table></div>' },
      { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
      { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td> <p>Your content here</p></td></tr></table></div>' }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });
});



document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll('.nav-pills .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });
});





(function() {
  "use strict";

/**...................................
   * Easy selector helper function
......................................*/
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**..........................................
   * Easy event listener function
   ............................................*/
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**........................................................
   * Easy on scroll event listener 
  ........................................................ */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  
  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /*******************************************************************
   * Toggle .header-scrolled class to #header when page is scrolled
  *****************************************************************/
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  

   /*--------------------------------------------------------------
#  Initiate Bootstrap validation check
--------------------------------------------------------------*/
 
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
/*--------------------------------------------------------------
#  Initiate Datatables
--------------------------------------------------------------*/
 
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable);
  })

  

})();


/*----------------------------------------
JavaScript for form validation and modal --
-------------------------------------------*/

  // Wait for the document to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    const termsCheckbox = document.getElementById('terms');
    const privacyPolicyLink = document.getElementById('privacyPolicyLink');
    const privacyPolicyModal = new bootstrap.Modal(document.getElementById('privacyPolicyModal'));

    // Prevent form submission if terms checkbox is not checked
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
      if (!termsCheckbox.checked) {
        event.preventDefault(); // Prevent form submission
        alert('You must accept the terms and conditions to proceed.');
      }
    });

    // Show privacy policy modal on link click
    privacyPolicyLink.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent link navigation
      privacyPolicyModal.show(); // Show the privacy policy modal
    });
  });

/*----------------------------------------
JavaScript for Approval page
-------------------------------------------*/
 
    const approveModal = document.getElementById('approveModal');
    approveModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget;
      const channelId = button.getAttribute('data-channel-id');
      const channelName = button.getAttribute('data-channel-name');
      const channelOwner = button.getAttribute('data-channel-owner');
      
      document.getElementById('modalChannelName').textContent = channelName;
      document.getElementById('modalChannelOwner').textContent = channelOwner;
      document.getElementById('modalChannelId').value = channelId;
    });

    const descriptionModal = document.getElementById('descriptionModal');
    descriptionModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget;
      const channelDescription = button.getAttribute('data-channel-description');
      
      document.getElementById('fullChannelDescription').innerHTML = formatDescription(channelDescription);
    });

    function formatDescription(description) {
    const words = description.split(' ');
    let formattedDescription = '';
    let lineLength = 0;

    for (let word of words) {
      // Check if adding the next word exceeds the line length
      if (lineLength + word.length + 1 > 60) {
        formattedDescription += '<br>';
        lineLength = 0;
      }
      
      formattedDescription += word + ' ';
      lineLength += word.length + 1;
    }
    
    return formattedDescription.trim();
  }



  
 