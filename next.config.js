/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  images: {
    remotePatterns:[
      {
      protocol:"https",
      hostname:"via.placeholder.com"
    },
      {
      protocol:"https",
      hostname:"i.pravatar.cc"
    },
      {
      protocol:"https",
      hostname:"static.greatbigcanvas.com"
    },
      {
      protocol:"https",
      hostname:"upload.wikimedia.org"
    },
      {
      protocol:"http",
      hostname:"res.cloudinary.com"
    },
      {
      protocol:"https",
      hostname:"cdn.apartmenttherapy.info"
    },
      {
      protocol:"https",
      hostname:"img.pikbest.com"
    },
      {
      protocol:"https",
      hostname:"img.pikbest.com"
    },
      {
      protocol:"https",
      hostname:"previews.123rf.com"
    },
      {
      protocol:"https",
      hostname:"thumbs.dreamstime.com"
    },
      {
      protocol:"https",
      hostname:"mln4vdu6fmby.i.optimole.com"
    },
      {
      protocol:"https",
      hostname:"townsquare.media"
    },
      {
      protocol:"https",
      hostname:"vailwillows.com"
    },
      {
      protocol:"https",
      hostname:"pikwizard.com"
    },
  ]
  },
};

module.exports = nextConfig;

