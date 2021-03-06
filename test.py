from flask_testing import TestCase
import unittest
import json
import os

from app import db, create_app
from models import db, Player, Stats
from utils import StatsCalculator

class Test(TestCase):
    def create_app(self):
        app = create_app()
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_upload(self):
        game = open('data/test/basic_point.json').read()
        self.client.post('/upload', data=game, content_type='application/json')

        player = Player.query.filter_by(name='Owen Lumley').first()
        stats = Stats.query.filter_by(player_id=player.id).first()
        assert stats.pulls == 1

    # def test_stats_calculator(self):
    #     game = json.loads(open('data/ocua_17-18_test.json').read())
    #     points = json.loads(game['points'])['points']
    #     game_id = 1
    #
    #     stats = StatsCalculator(game_id, points).run()
    #     # assert


if __name__ == '__main__':
    os.environ['APP_SETTINGS'] = 'config.TestingConfig'
    unittest.main()
