<?php get_header(); ?>
<div class="rq-blog-listing">
    <div class="rq-listing-wrapper">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <?php get_template_part('templates/blog-templates/content', get_post_format()); ?>
        <?php endwhile; endif; ?>
        <?php
        if (function_exists('turbo_pagination_blog')) {
            turbo_pagination_blog();
        }
        ?>
    </div>
</div>
<?php get_footer(); ?>
