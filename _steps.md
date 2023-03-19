# update npm & packages
npm i -g npm
npm update

# Project
npm create vite@latest
cd vite-project
npm i
npm run dev

npm i -D eslint-plugin-react eslint-plugin-react-hooks


# React
npm i react-router-dom@6
npm i @tanstack/react-query
npm i redux react-redux redux-logger
npm i reselect
npm i redux-persist
npm i redux-thunk


# extra
npm i sass
npm i styled-components
npm i firebase
npm i -D vite-plugin-svgr
npm i @stripe/stripe-js @stripe/react-stripe-js
npm i stripe dotenv

npm i -g netlify-cli
npm i -D typescript @types/react @types/react-dom @types/node @types/node


# Github
## per-device
git config --global push.autoSetupRemote true
git config --global user.name "FadyAmir223"
git config --global user.email "fadyamir223@gmail.com"
passowrd: christover23

ssh-keygen -t rsa -b 4096 -C "fadyamir223@gmail.com"
cat ~/.ssh/id_rsa.pub | clip

curl -u "<github-username>" --data "{\"title\":\"My SSH Key\",\"key\":\"<ssh-key>\"}" https://api.github.com/user/keys

|| [https://github.com/settings/keys]
new SSH key => title & key => add SSH key


## per project
git init
git remote add origin <repo_url>
touch .gitignore
git pull <remote> <branch> --rebase

git add .
git commit -m "msg"

git branch -M <branch>
git checkout <branch>
|| git checkout -b <branch>

git merge <branch>

git push origin <branch>
|| git push


[clone]
git clone <repo-ssh-url>

[clone-branch]
git clone -b <branch> <repo-ssh-url>


# tailwind
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# optional
npm i @tailwindcss/line-clamp


tailwind.comfig.cjs
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

index.css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

## optional
https://github.com/tailwindlabs/prettier-plugin-tailwindcss


# icons
npm i react-icons

import { IconName } from "react-icons/fa";