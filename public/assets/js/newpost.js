const loginFormHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#title-post').value.trim();
    const postBody = document.querySelector('#post-body').value.trim();
  
    if (postTitle && postBody) {
      const response = await fetch('/api/user/post', {
        method: 'POST',
        body: JSON.stringify({ postTitle, postBody }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
};
  

document
.querySelector('.new-post-form')
.addEventListener('new-post-submit', loginFormHandler);