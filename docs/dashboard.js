document.addEventListener('DOMContentLoaded', () => {
    // Fetch user posts
    fetch('/user-posts')
      .then(response => response.json())
      .then(posts => {
        const postsContainer = document.getElementById('user-posts');
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('entry');
          postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
          `;
          postsContainer.appendChild(postElement);
        });
      });
  
    // Fetch recent activities
    fetch('/recent-activities')
      .then(response => response.json())
      .then(activities => {
        const activitiesContainer = document.getElementById('activities');
        activities.forEach(activity => {
          const activityElement = document.createElement('div');
          activityElement.classList.add('entry');
          activityElement.innerHTML = `
            <p>${activity.description}</p>
            <span class="date">${activity.date}</span>
          `;
          activitiesContainer.appendChild(activityElement);
        });
      });
  
    // Handle post publishing
    const publishPostForm = document.getElementById('publish-post-form');
    publishPostForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(publishPostForm);
      const postData = {
        title: formData.get('title'),
        content: formData.get('content')
      };
  
      fetch('/publish-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Post published successfully!');
          location.reload();
        } else {
          alert('Failed to publish post.');
        }
      });
    });
  });
  