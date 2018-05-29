/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for production'));

webpack(webpackConfig).run( (err,status) => {
  if(err){
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = status.toJson();

  if( jsonStats.hasErrors ){
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if ( jsonStats.hasWarnings ){
    console.log(chalk.yellow('Warnings'));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`Webpack stats: ${status}`);

  console.log(chalk.green('Build succeed'));

  return 0;
});
