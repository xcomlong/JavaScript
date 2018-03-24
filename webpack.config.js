var path = require('path')
var webpack = require('webpack')

var HappyPack = require('happypack');  

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

//var glob = require("glob");
//var PruifyCSSPlugin = require("purifycss-webpack");

module.exports = {
  //打包入口
  entry: {
    main: './src/main.js',
    jquery:'jquery',
    vue:['vue'],
    //'element-ui': ["element-ui"],
  },
  //配置打包结果
  output: {
    /*output 目录对应一个绝对路径*/
    path: path.resolve(__dirname, 'wwwroot'),
    /*按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）前缀*/
    publicPath: '',
    /*此选项决定了每个输出 bundle 的名称*/
    filename: './js/[name].js?[hash:8]'
  },
  /*这些选项决定了如何处理项目中的不同类型的模块*/
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:[{
            loader:'css-loader',
            options:{
              importLoaders:1
            }
          },{
            loader:'postcss-loader',
            options:{
                plugins:function(){
                    return [
                        require('postcss-import')(),        //一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
                        require("autoprefixer")({browsers:['last 5 versions']})
                    ]
                }
            }
        }],
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        //loader: 'babel-loader',
        loader: 'happypack/loader?id=js',
        exclude: /node_modules/
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
        options: {
          name: 'assets/[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: 'assets/[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  externals: {
    //'element-ui':'ElementUI',
    //jquery: "jQuery"
  },
  /*配置模块如何解析*/
  resolve: {
    /*创建 import 或 require 的别名，来确保模块引入变得更简单*/
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    },
    /*自动补全识别后缀*/
    extensions: ['*', '.js', '.vue', '.json', '.css'],
  },
  //轻量级的服务器
  devServer: {
    /*告诉服务器从哪里提供内容*/
    //contentBase:'wwwroot/', 
    /*此路径下的打包文件可在浏览器中访问*/
    //publishPath:'/assets/',
    /*在 dev-server 的两种不同模式之间切换。默认情况下，应用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台*/
    //inline: true,
    /*开启时会打开浏览器*/
    //open : true,
    /*启用 webpack 的模块热替换特性*/
    //hot:true 
    /* 开启gzip压缩*/
    //compress: true, 
    /*指定使用一个 host*/
    //host  
    /*如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用*/
    //proxy:{"/api": "http://localhost:3000"} 
    /*指定要监听请求的端口号*/
    port: 9999,
    /*当使用HTML5 History API，任意的 404 响应可以提供为 index.html 页面*/
    historyApiFallback: true,
    /*启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。*/
    noInfo: true,
    /*默认情况下，dev-server 通过 HTTP 提供服务*/
    //https: true
    /*当有错误时,显示全屏错误或警告*/
    overlay: true,
    /*当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)*/
    //lazy: true,
    /*启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警*/
    //quiet: true 
  },
  /*配置如何展示性能提示*/
  performance: {
    /*打开/关闭提示*/
    hints: false
  },
  /*开发工具*/
  devtool: '#eval-source-map',
  //定义插件
  plugins: [
    new CleanWebpackPlugin(['wwwroot']),
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,               //去注释
        collapseWhitespace: true,           //压缩空格
        removeAttributeQuotes: true         //去除属性引用
      },
      /*
          true|false，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值，添加hash形式如下所示：
              html <script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>
      */
      hash: true,
      /*
          输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置（例如'html/index.html'）
          关于filename补充两点：
              1、filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
              2、指定生成的html文件内容中的link和script路径是相对于生成目录下的，写路径的时候请写生成目录下的相对路径。
      */
      filename: './index.html',
      /*
          本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)，如比如 handlebars!src/index.hbs；
          关于template补充几点：
              1、template配置项在html文件使用file-loader时，其所指定的位置找不到，导致生成的html文件内容不是期望的内容。
              2、为template指定的模板文件没有指定任何loader的话，默认使用ejs-loader。如template: './index.html'，若没有为.html指定任何loader就使用ejs-loader
      */
      template: './src/index.html',
      /*
           string|function，可以指定模板的内容，不能与template共存。配置值为function时，可以直接返回html字符串，也可以异步调用返回html字符串。
      */
      //templateContent:'',
      //compile: true,
      /*
          添加特定favicon路径到输出的html文档中，这个同title配置项，需要在模板中动态获取其路径值
      */
      favicon: './src/assets/favicon.ico',
      /*
           true|fasle, 默认true； 如果为true表示在对应的thunk文件修改后就会emit文件
      */
      //cache: true,
      /*
          true|false，默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。
      */
      //showErrors: true,
      /*
          允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；
      */
      //chunks: 'all',
      /*
          这个与chunks配置项正好相反，用来配置不允许注入的thunk。
      */
      //excludeChunks: [],
      /*
          none | auto| function，默认auto； 允许指定的thunk在插入到html文档前进行排序。
            >function值可以指定具体排序规则；auto基于thunk的id进行排序； none就是不排序
      */
      //chunksSortMode:NONE,
      /* 
          生成的html文档的标题。配置该项，它并不会替换指定模板文件中的title元素的内容，除非html模板文件中使用了模板引擎语法来获取该配置项值，如下ejs模板语法形式：
            <title>{%= o.htmlWebpackPlugin.options.title %}</title>
      */
      //title: 'Webpack App',
      /*
          true|fasle, 默认false；是否渲染link为自闭合的标签，true则为自闭合标签
      */
      //xhtml: false
      /*
          向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
          1、true或者body：所有JavaScript资源插入到body元素的底部
          2、head: 所有JavaScript资源插入到head元素中
          3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
      */
      inject:true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['jquery','vue'],
      minChunks: 2
    }),
    new ExtractTextPlugin("./css/[name].css?[hash:8]"),
    //消除未使用的css
    //new PruifyCSSPlugin({
    //  paths:glob.sync(path.join(__dirname,'src/*.html'))//src下所有的html
    //}),
    new HappyPack({
      id: 'js',
      loaders: ['babel-loader'],
      threads: 4,
      verbose: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
          postcss: function(){
              return [
                  require("autoprefixer")({
                      browsers: ['ie>=8','>1% in CN']
                  })
              ]
          }
      }
    }),
    new CopyWebpackPlugin([{
      from:__dirname+'/src/static',//打包的静态资源目录地址
      to:'./static/' //打包到dist下面的public
    }]),
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      //允许你创建一个在编译时可以配置的全局常量
      'process.env': {
        //或JSON.stringify('production')
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      //美化输出
      beautify: false,
      // 保留版权注释
      comments: false,
      //使用 SourceMaps 将错误信息的位置映射到模块。这会减慢编译的速度。
      sourceMap:false,
      //是否启用压缩功能
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        /* 
            删除所有的 `console` 语句
            还可以兼容ie浏览器
        */
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      //加载器是否要切换到优化模式
      minimize: true
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
  ])
}
