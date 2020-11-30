/**
 * TODO toadums refactor this file.
 *
 * I find the values defined in this file are not representative
 * of the common padding/margin values in the app. It would also
 * be nice to auto downscale for smaller phones - IMO we should
 * just divide screen sizes into >= iphone6 and < iphone6.
 *
 * I also think we should define our paddings numerically, because
 * I don't think the naming is quite right or obvious. I think we
 * should go like this, manually for each phone size. Take a couple
 * of screens, and get the sizing right on a couple screen sizes.
 *
 * This still won't be a catch all solution for all situations, but
 * I think it will be good enough to handle almost all cases.
 *
 * We could also add some named variables. One that comes to mind is
 * the padding above single page inputs. It is 90px in the designs,
 * and that is waaay too much on an iPhone 5s.
 *
 * export default {
 *   ...
 *   8:  ..
 *   12: ..
 *   16: isLargePhone ? 16 : 12,
 *   24: isLargePhone ? 24 : 20
 *   32: ..
 *   ...
 * }
 *
 * NOTE: I don't want to do anything totally dynamic, I have seen too
 * many apps that try to do super smart paddings based on screen size
 * and in my experience they open up a lot of edge cases.
 */

export default {
  xxs: 8,
  xs: 12,
  sm: 16,
  md: 24,
  lg: 36,
  xl: 48,
  xxl: 60,
};
