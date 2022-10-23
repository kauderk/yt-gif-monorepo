# yt-gif-graph

# Database
Follow the `.env.example` guidelines to set up your environment variables.

## Prisma
Postgresql based, you can use [heroku's](https://youtu.be/D-6fESqS9f0?t=65) free alternative

- Connection (if you are using free databases, you won't be allowed to migrate)
```
prisma prisma db push
prisma generate
prisma studio
```

- [Backups](https://devcenter.heroku.com/articles/heroku-postgres-backups#downloading-your-backups)
```
### start to capture the backup
heroku pg:backups:capture -a yt-graph

### download the backup 
heroku pg:backups:download -a yt-graph

### stop capturing
heroku pg:backups:cancel -a yt-graph
```

## Firebase
Download your `firebase-admin` credentials to `./apps/website/src/lib/modules/firebase/admin/admin.json` from your project's [console](https://console.firebase.google.com/) > `/settings/serviceaccounts/adminsdk` > `Generate Private Key` then insert them into your own `.env` file.


##### Cloned and based from [dump-app](https://github.com/augustinbegue/dump-app), also inspired by [nuxt3-daisyui-firebase](https://github.com/renbesson/nuxt3-daisyui-firebase)