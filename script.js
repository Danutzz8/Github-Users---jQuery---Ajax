$(document).ready(() => {
    $('#searchUser').on('keyup', (e) => {  // an event for when we start to type to catch what we are typing
        // console.log(e.target.value);
        let username = e.target.value;

        // Make request to Github

        $.ajax({
            url: 'https://api.github.com/users/' + username, // fetch data from github
            data: {
                client_id: '4e81a8f133fb2d14e3f6',
                client_secret: '9ea5cedc4d806e9909dac578bb1bc3dbacd3a317'
            }
        }).done((user) => {
            // console.log(user); // we can see the object in console as we type in

            $.ajax({
                url: 'https://api.github.com/users/' + username +'/repos', // fetch data from repos 
                data: {
                    client_id: '4e81a8f133fb2d14e3f6',
                    client_secret: '9ea5cedc4d806e9909dac578bb1bc3dbacd3a317',
                    sort: 'created: asc',
                    per_page: 10
                }
            }).done((repos) => {
                $.each(repos, (index, repo) => {
                    $('#repos').append(`
                    <div class="card mb-2">
                    <div class="row">
                      <div class="col-md-7">
                        <strong>${repo.name}</strong>: ${repo.description}
                      </div>
                      <div class="col-md-3">
                        <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                        <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                      </div>
                      <div class="col-md-2">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                      </div>
                    </div>
                  </div>
                    `)
                })
            });

            $('#profile').html(`
            <div class="card border-primary mb-3" style="max-width: 100rem;">
            <div class="card-header"><h3>${user.name}</h3></div>
            <div class="card-body">
              <div class="row">
              <div class="col-md-3">
                <img class="img-thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-info">Following: ${user.following}</span>
                <span class="badge badge-secondary">Twitter-ID: ${user.twitter_username}</span>
                
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                  <li class="list-group-item">Ocupation: ${user.bio}</li>
                </ul>
                </div>
              </div>
            </div>
          </div>
          <h3 class="page-header">Latest Repos</h3>
          <div id="repos"></div>
            
            `);
        });
    });
});