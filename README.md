### Clone the repo 

git clone git@github.com:vibhash1083/buffer-clone.git

### Install and Create virtual environment

- sudo easy_install pip
- sudo  pip install virtualenv
- sudo pip install virtualenvwrapper
- mkdir ~/.virtualenvs
- export WORKON_HOME=$HOME/.virtualenvs  
- source /usr/local/bin/virtualenvwrapper.sh 
- mkvirtualenv <environement_name> --python=/usr/local/bin/python3

(location of venvwrapper can be got with `which virtualenvwrapper`)
(location of python3 can be got with `which python3`) 

### Install requirements

pip install -r requriments/development.txt


### Run Migrations

python socialshare/manage.py migrate

### Run Backend Server 

python socialshare/manage.py runserver



### Install Frontend Packages 
cd buffer-clone/socialshare/frontend
npm install

### Start node server

npm start

### Add a facebook/twitter account

### Extra Info 

Backend code - socialshare/apps
Front end code -  socialshare/frontend
